import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { CircularProgress, Alert } from '@mui/material';

interface FetchTextProps {
  textId: string;
  onFetch: (text: string) => void;
}

const FetchText: React.FC<FetchTextProps> = ({ textId, onFetch }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await axiosClient.get(`/text/${textId}`);
        onFetch(response.data.text);
      } catch (error) {
        setError('Error retrieving the text');
      } finally {
        setLoading(false);
      }
    };

    fetchText();
  }, [textId, onFetch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return null;
};

export default FetchText;
export {};
