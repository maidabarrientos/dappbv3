import { ethers } from 'ethers';

export const PLATFORM_ADDRESS = '0x1234567890123456789012345678901234567890';

export const SUPPORTED_NETWORKS = {
  // Mainnets
  mainnet: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    isPaid: true,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key'
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    isPaid: true,
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/your-api-key'
  },
  arbitrum: {
    name: 'Arbitrum',
    chainId: 42161,
    isPaid: true,
    rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/your-api-key'
  },
  // Testnets
  sepolia: {
    name: 'Sepolia',
    chainId: 11155111,
    isPaid: false,
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/your-api-key'
  },
  goerli: {
    name: 'Goerli',
    chainId: 5,
    isPaid: false,
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/your-api-key'
  },
  mumbai: {
    name: 'Mumbai (Polygon Testnet)',
    chainId: 80001,
    isPaid: false,
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/your-api-key'
  },
  arbitrumGoerli: {
    name: 'Arbitrum Goerli',
    chainId: 421613,
    isPaid: false,
    rpcUrl: 'https://arb-goerli.g.alchemy.com/v2/your-api-key'
  }
};

export async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      return { 
        provider, 
        signer,
        chainId,
        isTestnet: isTestNetwork(chainId)
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  } else {
    throw new Error('Please install MetaMask or another Web3 wallet');
  }
}

export async function makePayment(amountEth: number) {
  try {
    const { signer, isTestnet } = await connectWallet();
    
    // If on testnet, no payment required
    if (isTestnet) {
      return { hash: 'testnet-free' };
    }
    
    const tx = await signer.sendTransaction({
      to: PLATFORM_ADDRESS,
      value: ethers.parseEther(amountEth.toString()),
    });

    return tx;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}

export async function switchNetwork(chainId: number) {
  if (!window.ethereum) throw new Error('No crypto wallet found');
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error: any) {
    // If the chain hasn't been added to MetaMask
    if (error.code === 4902) {
      const network = Object.values(SUPPORTED_NETWORKS).find(n => n.chainId === chainId);
      if (!network) throw new Error('Unsupported network');
      
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: network.name,
            rpcUrls: [network.rpcUrl],
          },
        ],
      });
    } else {
      throw error;
    }
  }
}

export function isTestNetwork(chainId: number): boolean {
  return Object.values(SUPPORTED_NETWORKS)
    .filter(network => !network.isPaid)
    .some(network => network.chainId === chainId);
}