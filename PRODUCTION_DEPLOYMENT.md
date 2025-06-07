# Glodinas Makelaardij Website

This repository contains the code for the Glodinas Makelaardij real estate agency website.

## Production Deployment Guide

### Frontend Deployment (Next.js)

1. **Environment Setup**:
   - Ensure the `.env.production` file is properly configured with the following variables:
     ```
     NEXT_PUBLIC_API_URL=https://api.glodinasmakelaardij.nl
     ```

2. **Build and Deploy**:
   - The repository is configured to be deployed on Vercel
   - Vercel will automatically build and deploy the website when changes are pushed to the main branch
   - Make sure to set the environment variables in the Vercel project settings

3. **Domain Configuration**:
   - The production website is accessible at `http://glodinasmakelaardij.nl`
   - Ensure DNS records are properly configured to point to the Vercel deployment

### Backend API Deployment (Flask)

1. **Environment Setup**:
   - Ensure the following environment variables are set on the server:
     ```
     # Database connection (DO NOT include credentials in version control)
     # Request the actual connection string from the system administrator
     NEON_DATABASE_URL=postgresql://<username>:<password>@<host>/<database>?sslmode=require
     
     # Email configuration
     MAILTRAP_API_TOKEN=<your_mailtrap_token>
     MAILTRAP_FROM_EMAIL=<from_email>
     MAILTRAP_TO_EMAIL=<to_email>
     
     # Flask configuration
     FLASK_ENV=production
     SECRET_KEY=<your_secret_key>
     ```

2. **Deploy the API**:
   - The API should be deployed to a server accessible at `https://api.glodinasmakelaardij.nl`
   - Install dependencies: `pip install -r backend-api/requirements.txt`
   - Use a production WSGI server like Gunicorn: `gunicorn -w 4 -b 0.0.0.0:5000 backend-api.src.main:app`
   - Set up a reverse proxy (Nginx or Apache) to forward requests to the Flask application

3. **CORS Configuration**:
   - The API is configured to allow requests from the following origins:
     - `https://glodinasmakelaardij.nl`
     - `https://www.glodinasmakelaardij.nl`
     - `https://api.glodinasmakelaardij.nl`
   - If additional domains need access, update the CORS configuration in `backend-api/src/main.py`

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/glodinasflexwork/glodinasmakelaardij-website.git
   cd glodinasmakelaardij-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file with the following content:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```
   - Create a `.env` file in the backend-api directory with the necessary environment variables (see above)

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Start the backend API**:
   ```bash
   cd backend-api
   pip install -r requirements.txt
   python src/main.py
   ```

## Troubleshooting

### Login Issues

If the login functionality is not working:

1. **Check API Connection**:
   - Ensure the API is running and accessible
   - Verify that the `NEXT_PUBLIC_API_URL` environment variable is correctly set
   - Check browser console for any CORS or network errors

2. **Database Connection**:
   - Verify that the database connection is working by accessing the `/health` endpoint of the API
   - Ensure the `NEON_DATABASE_URL` environment variable is correctly set

3. **CORS Issues**:
   - If you see CORS errors in the browser console, check that the domain is included in the allowed origins list in `backend-api/src/main.py`

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

## Contact

For any issues or questions, please contact the repository owner.

