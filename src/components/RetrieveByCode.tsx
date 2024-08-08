// src/components/RetrieveByCode.tsx
import React, { useState } from 'react';
import { fetchTextByCode } from '../api/textApi';
import { Container, TextField, Button, Typography, CircularProgress, Alert, Paper } from '@mui/material';

const RetrieveByCode: React.FC = () => {
  const [shortCode, setShortCode] = useState<string>('');
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchText = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedText = await fetchTextByCode(shortCode);
      setText(fetchedText);
    } catch (error) {
      setError('Error retrieving the text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TextField
        label="Enter Short Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleFetchText} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Fetch Text'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {text && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-wrap' }}>
            {text}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default RetrieveByCode;
