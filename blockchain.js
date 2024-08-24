import { ethers } from 'ethers';

console.log('Ethers:', ethers); // Debugging line

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Connection failed. Please check the console for details.');
      return null;
    }
  } else {
    alert('Please install MetaMask or another Ethereum wallet provider.');
    return null;
  }
};

export const getSigner = () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  } else {
    throw new Error('No Ethereum provider found');
  }
};
