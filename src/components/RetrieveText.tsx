import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchText } from '../api/textApi';
import { Container, Typography, CircularProgress, Alert, Button, Paper } from '@mui/material';
import axios from 'axios';
import ResizableTextField from './ResizableTextField';

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
        setTimeout(() => setCopySuccess(null), 3000); // Hide message after 3 seconds
      } catch (error) {
        setCopySuccess('Failed to copy text.');
        setTimeout(() => setCopySuccess(null), 3000); // Hide message after 3 seconds
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
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 1200 }}>
        <ResizableTextField
          value={text || ''}
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
          disabled={!text} // Disable button if no text
        >
          Copy Text
        </Button>
        {copySuccess && (
          <Alert severity={copySuccess.includes('copied') ? 'success' : 'error'} sx={{ marginTop: 2 }}>
            {copySuccess}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default RetrieveText;
