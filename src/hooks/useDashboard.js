// useDashboard.js
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { userService } from '../services/userService';
import { walletService } from '@/services/walletService';
import { authenticationService } from '@/services/authenticationService';
import { useNavigate } from 'react-router-dom';

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      
      // First check if user is authenticated
      if (!authenticationService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      const userData = await userService.getCurrentUser();
      const walletData = await walletService.getWalletInfo(userData.id);
      
      const dashboardData = {
        ...userData,
        ...walletData
      };
      
      setDashboard(dashboardData);
      setError(null);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message);
      
      if (err.message.includes('authentication') || err.message.includes('401')) {
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