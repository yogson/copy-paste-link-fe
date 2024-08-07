import React, { useState } from 'react';
import TextForm from './components/TextForm';
import LinkModal from './components/LinkModal';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');

  const handleFormSubmit = (data: { text: string; oneTime: boolean }) => {
    const generatedLink = `http://example.com/secret/${Date.now()}`;
    setLink(generatedLink);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Secret Link Service
      </Typography>
      <TextForm onSubmit={handleFormSubmit} />
      <LinkModal open={open} handleClose={handleClose} link={link} />
    </Container>
  );
};

export default App;
