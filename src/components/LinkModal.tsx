import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface LinkModalProps {
  open: boolean;
  handleClose: () => void;
  link: string;
}

const LinkModal: React.FC<LinkModalProps> = ({ open, handleClose, link }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Your Link
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default LinkModal;
