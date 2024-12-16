// useTransaction.js
import { transactionService } from '@/services/transactionService';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useTransaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const transactionData = await transactionService.getTransactionHistory();
      setTransaction(transactionData);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load transaction data');
    } finally {
      setLoading(false);
    }
  };
  const createTransaction = async (transactionData) => {
    try {
      setLoading(true);
      const createdTransaction = await transactionService.createTransaction(transactionData);
      setTransaction(createdTransaction);
      toast.success('Transaction created successfully');
      return createdTransaction;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to create transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return {
    transaction,
    loading,
    error,
    fetchTransaction,
    createTransaction
  };
};