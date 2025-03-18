#!/bin/bash

# Exit on error
set -e

# Define environment name
ENV_NAME="env3"

# Check if conda is installed
if ! command -v conda &> /dev/null; then
    echo "Conda is not installed. Please install Conda first."
    exit 1
fi

# Check if the environment already exists
if conda info --envs | grep -q $ENV_NAME; then
    echo "Conda environment '$ENV_NAME' already exists."
    echo "To activate it, run: conda activate $ENV_NAME"
    echo "To remove it and create a new one, run: conda env remove -n $ENV_NAME"
    exit 0
fi

# Create a new conda environment with Node.js
echo "Creating Conda environment '$ENV_NAME' with Node.js..."
conda create -y -n $ENV_NAME nodejs

# Activate the environment
echo "Activating environment..."
source "$(conda info --base)/etc/profile.d/conda.sh"
conda activate $ENV_NAME

# Install project dependencies
echo "Installing project dependencies..."
npm install

echo ""
echo "Setup complete! To activate the environment, run:"
echo "conda activate $ENV_NAME"
echo ""
echo "Next steps:"
echo "1. Compile the contract: npx hardhat compile"
echo "2. Run tests: npx hardhat test"
echo "3. Interact with the deployed contract on Sepolia: npx hardhat run scripts/check-balance.js --network sepolia"
