import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchText } from '../api/textApi';
import { Container, Typography, CircularProgress, Alert, TextField, Box, Button } from '@mui/material';
import axios from 'axios';

const RetrieveText: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid text ID');
      setLoading(false);
      return;
    }

    const getText = async () => {
      try {
        const retrievedText = await fetchText(id);
        setText(retrievedText);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError('Nothing here...');
        } else {
          setError('Error retrieving the text');
        }
      } finally {
        setLoading(false);
      }
    };

    getText();
  }, [id]);

  const handleCopy = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopySuccess('Text copied to clipboard!');
      } catch (error) {
        setCopySuccess('Failed to copy text.');
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Text
      </Typography>
      <TextField
        value={text || ''}
        multiline
        rows={25}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCopy}
        sx={{ marginTop: 2 }}
      >
        Copy Text
      </Button>
      {copySuccess && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          {copySuccess}
        </Alert>
      )}
    </Container>
  );
};

export default RetrieveText;
