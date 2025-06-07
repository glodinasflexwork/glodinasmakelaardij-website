# Git Security Setup Instructions

This repository is configured with git-secrets and pre-commit hooks to prevent sensitive information from being committed. This document provides instructions on how to set up and use these tools.

## Setup Instructions for Developers

When you clone this repository, you'll need to set up the pre-commit hooks on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/glodinasflexwork/glodinasmakelaardij-website.git
   cd glodinasmakelaardij-website
   ```

2. **Install pre-commit**:
   ```bash
   pip install pre-commit
   ```

3. **Install git-secrets**:
   ```bash
   # On macOS with Homebrew
   brew install git-secrets

   # On Linux
   git clone https://github.com/awslabs/git-secrets.git
   cd git-secrets
   sudo make install
   cd ..
   ```

4. **Set up the hooks**:
   ```bash
   pre-commit install
   git secrets --install
   ```

5. **Create a local .env file**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with the actual values (DO NOT COMMIT THIS FILE)
   ```

## How to Use

The pre-commit hooks will automatically run when you try to commit changes. If sensitive information is detected, the commit will be blocked.

### Adding Patterns to Detect

To add new patterns that should be detected:

```bash
git secrets --add --literal "pattern-to-detect"
```

For example:
```bash
git secrets --add --literal "api_key"
```

### Allowing Patterns (False Positives)

If you need to bypass the hooks for a legitimate reason (e.g., committing example code that looks like a secret but isn't):

1. **Add allowed patterns to .gitallowed**:
   ```bash
   echo "pattern-to-allow" >> .gitallowed
   git add .gitallowed
   git commit -m "Allow pattern in .gitallowed"
   ```

2. **Or use --no-verify for a one-time bypass** (use with caution):
   ```bash
   git commit -m "Your commit message" --no-verify
   ```

## Environment Variables

This project uses environment variables for configuration. Never commit actual credentials to the repository.

### For Local Development

Create a `.env.local` file with:

```
# Database Configuration
# Format: postgresql://<username>:<password>@<host>/<database>?sslmode=require
NEON_DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Mailtrap.io Email Configuration  
MAILTRAP_API_TOKEN=your_mailtrap_token
MAILTRAP_FROM_EMAIL=from@example.com
MAILTRAP_TO_EMAIL=to@example.com

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your_secret_key

# API URL for frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### For Production

In production environments (like Vercel), set these environment variables in the platform's settings panel.

## Security Best Practices

1. **Environment Variables**:
   - NEVER commit sensitive information like database credentials, API keys, or secrets to version control
   - Use environment variables or secure secret management solutions
   - For local development, use `.env` files that are listed in `.gitignore`

2. **Database Credentials**:
   - Regularly rotate database passwords
   - Use strong, unique passwords
   - Limit database user permissions to only what's necessary

3. **API Keys and Tokens**:
   - Treat API keys and tokens as sensitive information
   - Use environment-specific keys (different keys for development and production)
   - Implement proper token validation and expiration

## Troubleshooting

If you encounter issues with the pre-commit hooks:

1. **Hook installation failed**:
   ```bash
   pre-commit uninstall
   pre-commit install
   ```

2. **git-secrets not found**:
   Ensure git-secrets is properly installed and in your PATH.

3. **False positives**:
   Add the pattern to `.gitallowed` as described above.

For any other issues, please contact the repository maintainer.

