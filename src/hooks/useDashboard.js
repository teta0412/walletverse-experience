// useDashboard.js
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { userService } from '../services/userService';
import { walletService } from '@/services/walletService';
import { authenticationService } from '@/services/authenticationService';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '@/services/transactionService';

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      console.log('Starting dashboard data fetch...');
      
      // Check authentication
      if (!authenticationService.isAuthenticated()) {
        console.log('Not authenticated, redirecting to login...');
        navigate('/login');
        return;
      }

      // Sequential data fetching with logging
      console.log('Fetching user data...');
      const userData = await userService.getCurrentUser();
      console.log('User data received:', userData.id);

      console.log('Fetching wallet data...');
      const walletData = await walletService.getWalletInfo(userData.id);
      console.log('Wallet data received');

      console.log('Fetching transaction data...');
      const transactionData = await transactionService.getTransactionStatistics();
      console.log('Transaction data received');
      
      const dashboardData = {
        ...userData,
        ...walletData,
        ...transactionData,
      };
      
      console.log('Dashboard data compiled successfully');
      setDashboard(dashboardData);
      setError(null);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message);
      
      if (err.message.includes('authentication') || err.message.includes('401')) {
        console.log('Authentication error detected, redirecting to login...');
        toast.error('Session expired. Please login again');
        navigate('/login');
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [navigate]);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
};