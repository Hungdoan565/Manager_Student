#!/bin/bash
# setup.sh - Setup script for Student Management System

set -e

echo "🚀 Setting up Student Management System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.11+ from https://python.org/"
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    print_error "pip3 is not installed. Please install pip3"
    exit 1
fi

print_status "Prerequisites check passed"

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
else
    print_warning "Frontend dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating frontend .env file..."
    cp ../env.example .env
    print_warning "Please update frontend/.env with your Supabase credentials"
else
    print_warning "Frontend .env file already exists"
fi

cd ..

# Setup Backend
echo "🐍 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
if [ ! -f "venv/pyvenv.cfg" ] || ! pip list | grep -q "Django"; then
    print_status "Installing backend dependencies..."
    pip install -r requirements.txt
else
    print_warning "Backend dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating backend .env file..."
    cp ../env.example .env
    print_warning "Please update backend/.env with your Supabase credentials"
else
    print_warning "Backend .env file already exists"
fi

# Create Django project structure
if [ ! -f "manage.py" ]; then
    print_status "Creating Django project structure..."
    # This would be done manually or with django-admin
    print_warning "Please run 'django-admin startproject sms .' in the backend directory"
fi

deactivate
cd ..

# Create scripts directory structure
echo "📁 Setting up scripts..."
mkdir -p scripts/setup
mkdir -p scripts/deployment
mkdir -p scripts/development
mkdir -p scripts/utilities

print_status "Scripts directory structure created"

# Create GitHub Actions workflow directory
echo "🔄 Setting up CI/CD..."
mkdir -p .github/workflows

# Create basic GitHub Actions workflow
cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Run tests
        run: cd frontend && npm test
      - name: Run linting
        run: cd frontend && npm run lint
      - name: Build
        run: cd frontend && npm run build

  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: cd backend && pip install -r requirements.txt
      - name: Run tests
        run: cd backend && python manage.py test
      - name: Run linting
        run: cd backend && flake8 .
EOF

print_status "GitHub Actions workflow created"

# Create development scripts
echo "🛠️ Creating development scripts..."

# Frontend dev script
cat > scripts/development/start-frontend.sh << 'EOF'
#!/bin/bash
cd frontend
npm run dev
EOF

# Backend dev script
cat > scripts/development/start-backend.sh << 'EOF'
#!/bin/bash
cd backend
source venv/bin/activate
python manage.py runserver
EOF

# Full dev script
cat > scripts/development/start-dev.sh << 'EOF'
#!/bin/bash
# Start both frontend and backend in development mode

# Start backend in background
cd backend
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
EOF

# Make scripts executable
chmod +x scripts/development/*.sh

print_status "Development scripts created"

# Create database setup script
cat > scripts/setup/setup-database.sh << 'EOF'
#!/bin/bash
# Database setup script

echo "Setting up Supabase database..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Installing Supabase CLI..."
    npm install -g supabase
fi

# Initialize Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "Initializing Supabase project..."
    supabase init
fi

echo "Please run the following commands:"
echo "1. supabase login"
echo "2. supabase link --project-ref YOUR_PROJECT_REF"
echo "3. supabase db push"
EOF

chmod +x scripts/setup/setup-database.sh

print_status "Database setup script created"

# Create README for scripts
cat > scripts/README.md << 'EOF'
# Scripts Directory

This directory contains utility scripts for the Student Management System.

## Setup Scripts
- `setup/setup-database.sh` - Setup Supabase database

## Development Scripts
- `development/start-frontend.sh` - Start frontend development server
- `development/start-backend.sh` - Start backend development server
- `development/start-dev.sh` - Start both frontend and backend

## Deployment Scripts
- `deployment/` - Deployment scripts (to be added)

## Utilities
- `utilities/` - Utility scripts (to be added)

## Usage

Make sure scripts are executable:
```bash
chmod +x scripts/**/*.sh
```

Run scripts:
```bash
./scripts/development/start-dev.sh
```
EOF

print_status "Scripts documentation created"

# Final summary
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in frontend/.env and backend/.env"
echo "2. Setup Supabase project and run database migrations"
echo "3. Create Django project: cd backend && django-admin startproject sms ."
echo "4. Start development: ./scripts/development/start-dev.sh"
echo ""
echo "Documentation:"
echo "- Read DOCS/PRD.md for project requirements"
echo "- Read DOCS/implementation.md for implementation guide"
echo "- Read DOCS/UI_UX.md for design guidelines"
echo ""
echo "Happy coding! 🚀"
