#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status

echo "Starting Vercel build process..."

# Build the application
echo "Running npm build..."
npm run build

echo "Checking if dist directory exists..."
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found after build"
  exit 1
fi

echo "Checking if index.html exists..."
if [ ! -f "dist/index.html" ]; then
  echo "Error: dist/index.html not found after build"
  exit 1
fi

# Copy index.html to 200.html for SPA routing
echo "Creating 200.html for SPA routing..."
cp dist/index.html dist/200.html

# Verify that assets directory exists
echo "Checking assets directory..."
if [ ! -d "dist/assets" ]; then
  echo "Warning: dist/assets directory not found, creating it..."
  mkdir -p dist/assets
fi

# Create .vercel directory if it doesn't exist
echo "Creating .vercel directory..."
mkdir -p .vercel

# List the contents of the dist directory for debugging
echo "Contents of dist directory:"
ls -la dist

echo "Custom build completed successfully!"
