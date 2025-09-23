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

## Setup Script

The main setup script (`setup.sh`) will:

1. Check prerequisites (Node.js, Python, pip)
2. Install frontend dependencies
3. Create Python virtual environment
4. Install backend dependencies
5. Create environment files
6. Setup GitHub Actions workflow
7. Create development scripts
8. Setup database configuration

## Development Scripts

### Start Frontend Only

```bash
./scripts/development/start-frontend.sh
```

### Start Backend Only

```bash
./scripts/development/start-backend.sh
```

### Start Both (Recommended)

```bash
./scripts/development/start-dev.sh
```

## Database Setup

### Manual Setup

1. Create Supabase project
2. Run migrations from `DOCS/supabase_config.md`
3. Update environment variables

### Automated Setup

```bash
./scripts/setup/setup-database.sh
```

## Environment Variables

Copy `env.example` to `.env` in both frontend and backend directories:

```bash
cp env.example frontend/.env
cp env.example backend/.env
```

Then update with your actual Supabase credentials.

## Troubleshooting

### Common Issues

1. **Node.js not found**: Install Node.js 18+ from https://nodejs.org/
2. **Python not found**: Install Python 3.11+ from https://python.org/
3. **Permission denied**: Make scripts executable with `chmod +x scripts/**/*.sh`
4. **Dependencies not installing**: Check internet connection and try again

### Getting Help

- Check the main README.md for project overview
- Read DOCS/implementation.md for technical details
- Review DOCS/supabase_config.md for database setup
- Check GitHub Issues for known problems
