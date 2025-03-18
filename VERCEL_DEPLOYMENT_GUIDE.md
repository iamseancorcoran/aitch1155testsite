# Vercel Deployment Guide

This guide will walk you through deploying your ERC-1155 Smart Contract application to Vercel.

## Prerequisites

1. A Vercel account (which you've already set up)
2. Git repository with your project (already initialized)

## Deployment Steps

### 1. Commit latest changes

First, make sure all your changes are committed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
```

### 2. Deploy to Vercel

There are two ways to deploy to Vercel:

#### Option A: Using Vercel CLI

1. Install Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to complete deployment.

#### Option B: Using Vercel Dashboard (Recommended)

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure project settings:
   - Framework Preset: Vite
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Development Command: `npm run dev`
5. Click "Deploy"

### 3. Environment Variables

If needed, you can add environment variables in the Vercel dashboard:

1. Go to your project settings in Vercel dashboard
2. Navigate to "Environment Variables"
3. Add any required variables:
   - `NODE_ENV`: `production`
   - `NODE_VERSION`: `18.x`

### 4. Test Your Deployed Application

After deployment is complete, Vercel will provide you with a URL. Visit this URL to ensure:

1. The application loads correctly
2. User registration works
3. The certificate preview displays
4. Wallet connection functions properly (will require Sepolia testnet)

## Troubleshooting

If you encounter issues with your deployment:

1. **JavaScript Module Errors**: The `vercel.json` configuration includes MIME type settings to address this issue.

2. **Node.js Compatibility**: Make sure Vercel is using Node.js 18.x as specified in your configuration.

3. **Client-Side Routing Issues**: The SPA routing is handled by the rewrite rules in `vercel.json` and the 200.html file created during build.

4. **Deployment Logs**: Check the deployment logs in Vercel dashboard for specific error messages.

## Notes on Web3 Functionality

- Web3 functionality requires user interaction with a wallet (like MetaMask)
- The application is configured to connect to the Sepolia testnet
- Wallet connection may not work if the user doesn't have a compatible wallet or if they're not on the Sepolia network

## Custom Domains

After successful deployment, you can add a custom domain in the Vercel dashboard:

1. Go to project settings
2. Navigate to "Domains"
3. Add your domain and follow the verification steps
