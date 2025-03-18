# GitHub Pages Deployment Guide

This document provides information about the GitHub Pages deployment for the ERC1155 Certificate Minting application.

## Deployment Details

The application has been successfully deployed to GitHub Pages and is now accessible at:

**[https://iamseancorcoran.github.io/minting-magic-gateway/](https://iamseancorcoran.github.io/minting-magic-gateway/)**

## Configuration Changes Made

To enable GitHub Pages deployment, the following changes were made to the project:

1. **Added GitHub Pages Package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Updated package.json**:
   - Added homepage field: `"homepage": "https://iamseancorcoran.github.io/minting-magic-gateway"`
   - Added deployment scripts:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```

3. **Updated vite.config.ts**:
   - Added base path configuration:
     ```typescript
     base: '/minting-magic-gateway/',
     ```

## Deployment Process

The deployment was completed using the following steps:

1. Built the application with the updated configuration:
   ```bash
   npm run build
   ```

2. Deployed to GitHub Pages:
   ```bash
   npm run deploy
   ```

This process created a `gh-pages` branch in your GitHub repository and published the contents of the `dist` directory to that branch.

## Wallet Connection

The application uses:
- ethers.js for blockchain interaction
- Web3Modal for wallet connection UI
- WalletConnectProvider for supporting WalletConnect protocol

The wallet connection should work properly on GitHub Pages as:
- The site is served over HTTPS (required for wallet connections)
- The RPC URL is hardcoded and doesn't rely on environment variables
- No absolute paths are used in the code that would break on GitHub Pages

## Future Updates

To update the deployed site in the future:

1. Make your changes to the codebase
2. Run the deploy command:
   ```bash
   npm run deploy
   ```

This will rebuild the application and push the updated files to the gh-pages branch.

## Troubleshooting

If you encounter any issues with the deployed site:

1. **Wallet Connection Issues**: Check the browser console for errors. The most common issues are related to HTTPS requirements or network configuration.

2. **Missing Assets**: Ensure all asset paths are relative, not absolute.

3. **404 Errors**: GitHub Pages uses client-side routing, so direct navigation to routes may fail. Consider adding a 404.html file that redirects to the main page.
