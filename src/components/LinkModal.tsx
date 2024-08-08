import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './LinkModal.css'; // Ensure to import the CSS file

interface LinkModalProps {
  open: boolean;
  handleClose: () => void;
  link: string;
}

const LinkModal: React.FC<LinkModalProps> = ({ open, handleClose, link }) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopyAndClose = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess('Link copied to clipboard!');
      setTimeout(() => {
        setCopySuccess(null);
        handleClose();
      }, 1000);
    } catch (error) {
      setCopySuccess('Failed to copy the link.');
      setTimeout(() => setCopySuccess(null), 1000);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="modal-box"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Your Link
        </Typography>
        <Typography variant="body1" className="modal-link" sx={{ mb: 2 }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </Typography>
        <Box className="modal-button" sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleCopyAndClose}
            variant="contained"
            color="primary"
            startIcon={<ContentCopyIcon />}
          >
            Copy Link & Close
          </Button>
        </Box>
        {copySuccess && (
          <Alert
            severity={copySuccess.includes('copied') ? 'success' : 'error'}
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
            }}
            sx={{ mt: 2 }}
          >
            {copySuccess}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default LinkModal;
