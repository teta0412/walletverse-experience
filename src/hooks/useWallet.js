// useUser.js
import { walletService } from '@/services/walletService';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const walletData = await walletService.getWalletInfo(localStorage.getItem('userId'));
      setWallet(walletData);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return {
    wallet,
    loading,
    error,
    fetchWallet,
  };
};