# ERC-1155 Smart Contract Interface

A modern web application for interacting with ERC-1155 smart contracts on the Ethereum blockchain.

## Features

- Connect to Web3 wallets (MetaMask, WalletConnect)
- View and manage ERC-1155 tokens
- Mint new tokens
- Transfer tokens between addresses
- View transaction history
- Responsive design for all devices

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- ethers.js
- Web3 Provider Engine

## Development

To run this project locally:

```sh
# Clone the repository
git clone https://github.com/iamseancorcoran/aitch1155testsite.git

# Navigate to the project directory
cd aitch1155testsite

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Building for Production

```sh
# Build the project
npm run build

# Preview the production build locally
node static-server.js
```

## Deployment

This project is deployed on Vercel. Any changes pushed to the main branch will automatically trigger a new deployment.

To manually trigger a deployment:

```sh
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_CeeA39JVW4DD5wexzRnoL0JfWkhG/4mUKd1r8xI
```

## License

MIT
