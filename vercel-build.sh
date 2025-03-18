#!/bin/bash

# Build the application
npm run build

# Copy index.html to 200.html for SPA routing
cp dist/index.html dist/200.html

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

echo "Custom build completed successfully!"
