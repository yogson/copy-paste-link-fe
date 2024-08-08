import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { Button, TextField, FormControlLabel, Checkbox, Container, Typography, Paper, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { sendText } from '../api/textApi';
import LinkModal from './LinkModal';
import './TextForm.css'; // Ensure to import the CSS file

interface IFormInput {
  text: string;
  oneTime: boolean;
}

const TextForm: React.FC = () => {
  const { register, handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: { text: '', oneTime: false }
  });
  const { isDirty } = useFormState({ control });

  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [rows, setRows] = useState(25);

  const calculateRows = () => {
    const baseRowHeight = 24; // Adjust based on the actual row height in pixels
    const padding = 58; // Adjust based on the total padding/margin in pixels
    const availableHeight = window.innerHeight - padding;
    const calculatedRows = Math.floor(availableHeight / baseRowHeight) - 12;
    setRows(calculatedRows);
  };

  useEffect(() => {
    calculateRows();
    window.addEventListener('resize', calculateRows);
    return () => {
      window.removeEventListener('resize', calculateRows);
    };
  }, []);

  const handleSuccess = (generatedLink: string) => {
    setLink(generatedLink);
    setOpen(true);
  };

  const handleError = (error: string) => {
    console.error(error);
    // Handle error appropriately, e.g., show an error message to the user
  };

  const handleClose = () => setOpen(false);

  const handleFormSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const generatedLink = await sendText(data);
      handleSuccess(generatedLink);
    } catch (error) {
      console.error('Error sending text:', error);
      handleError('Error sending text');
    }
  };

  const handleClear = () => {
    reset({ text: '', oneTime: false });
  };

  return (
    <Container className="content" maxWidth={false}>
      <Typography variant="h4" component="h1" gutterBottom>
        Copy-Paste Link Service
      </Typography>
      <Paper elevation={3} sx={{ p: 3}}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            {...register('text', { required: true })}
            label="Enter your text"
            multiline
            rows={rows}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox {...register('oneTime')} />}
              label="One-time link"
              sx={{ flexGrow: 1 }}
            />
            <Box>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleClear}
                startIcon={<ClearIcon />}
                sx={{ mr: 2 }}
                disabled={!isDirty}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
      <LinkModal open={open} handleClose={handleClose} link={link} />
    </Container>
  );
};

export default TextForm;
