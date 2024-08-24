import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/Home.module.css'; 
import { connectWallet, getSigner } from '../utils/blockchain';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState('heads');
  const [token, setToken] = useState('ETH');

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
    }
  };

  const handleBet = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    const signer = getSigner();
    let amountInWei;

    try {
      if (token === 'ETH') {
        amountInWei = ethers.utils.parseEther(amount);
      } else if (token === 'SOL') {
        amountInWei = ethers.utils.parseUnits(amount, 9);
      } else if (token === 'BTC') {
        amountInWei = ethers.utils.parseUnits(amount, 8);
      }

      // Placeholder for actual contract interaction
      alert('Bet placed successfully!');
    } catch (error) {
      console.error('Failed to place bet:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Coin Flip Game</h1>
      <button onClick={handleConnectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect Wallet'}
      </button>

      <div className={styles.inputGroup}>
        <label>
          Amount to Bet:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount in ${token}`}
          />
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>
          Choose Token:
          <select value={token} onChange={(e) => setToken(e.target.value)}>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
          </select>
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label>
          Choose Side:
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option value="heads">Heads</option>
            <option value="tails">Tails</option>
          </select>
        </label>
      </div>

      <button className={styles.betButton} onClick={handleBet}>Place Bet</button>
    </div>
  );
}
