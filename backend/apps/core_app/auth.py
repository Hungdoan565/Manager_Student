import json
import time
from typing import Optional

import requests
from django.contrib.auth.models import User
from django.utils.functional import cached_property
from rest_framework import authentication, exceptions
from jwt import PyJWKClient, decode as jwt_decode, InvalidTokenError
import os

SUPABASE_PROJECT_URL = os.getenv('SUPABASE_URL') or os.getenv('SUPABASE_PROJECT_URL')
JWKS_URL = os.getenv('SUPABASE_JWKS_URL') or (f"{SUPABASE_PROJECT_URL}/auth/v1/jwks" if SUPABASE_PROJECT_URL else None)

_jwks_client_cache = {
    'client': None,
    'fetched_at': 0,
}

class SupabaseAuthentication(authentication.BaseAuthentication):
    """DRF authentication class validating Supabase JWT via JWKS.

    - Expects Authorization: Bearer <token>
    - Verifies RS256 signature against Supabase JWKS
    - Returns (user, token) where user is a local Django user (created lazily)
    """

    www_authenticate_realm = 'api'

    def authenticate(self, request):
        auth = authentication.get_authorization_header(request).split()
        if not auth or auth[0].lower() != b'bearer':
            return None  # No auth provided
        if len(auth) == 1:
            raise exceptions.AuthenticationFailed('Invalid Authorization header. No credentials provided.')
        if len(auth) > 2:
            raise exceptions.AuthenticationFailed('Invalid Authorization header. Credentials string should not contain spaces.')

        token = auth[1].decode('utf-8')
        payload = self._verify_token(token)

        # Map or create a Django user (by email if present, else sub)
        email = payload.get('email') or payload.get('user_metadata', {}).get('email')
        username = email or payload.get('sub')
        if not username:
            raise exceptions.AuthenticationFailed('Invalid token payload (missing subject/email).')

        user, _ = User.objects.get_or_create(username=username, defaults={
            'email': email or '',
            'is_active': True,
        })
        # Return token info including claims so permissions can read role
        return (user, {'token': token, 'claims': payload})

    def _verify_token(self, token: str) -> dict:
        if not JWKS_URL:
            raise exceptions.AuthenticationFailed('SUPABASE_URL or SUPABASE_JWKS_URL not configured.')

        # Cache PyJWKClient for 10 minutes
        now = time.time()
        client = _jwks_client_cache['client']
        if not client or now - _jwks_client_cache['fetched_at'] > 600:
            client = PyJWKClient(JWKS_URL)
            _jwks_client_cache['client'] = client
            _jwks_client_cache['fetched_at'] = now

        try:
            signing_key = client.get_signing_key_from_jwt(token)
            payload = jwt_decode(
                token,
                signing_key.key,
                algorithms=['RS256'],
                options={'verify_aud': False}  # Supabase default audience varies
            )
            return payload
        except InvalidTokenError as e:
            raise exceptions.AuthenticationFailed(f'Invalid token: {str(e)}')
