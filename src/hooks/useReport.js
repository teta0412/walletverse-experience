// src/hooks/useReport.js
import { reportService } from '@/services/reportService';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useReport = (walletId, timeFilter) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    if (!walletId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const report = await (timeFilter === 'month' 
        ? reportService.getMonthlyReport(walletId)
        : reportService.getYearlyReport(walletId));
      setData(report);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch report');
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [walletId, timeFilter]);

  return {
    data,
    loading,
    error,
    refetch: fetchReport
  };
};