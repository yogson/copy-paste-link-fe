import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, FormControlLabel, Checkbox, Container, Typography } from '@mui/material';
import { sendText } from '../api/textApi';
import LinkModal from './LinkModal';

interface IFormInput {
  text: string;
  oneTime: boolean;
}

const TextForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');

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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Copy-Paste Link Service
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          {...register('text', { required: true })}
          label="Enter your text"
          multiline
          rows={30}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={<Checkbox {...register('oneTime')} />}
          label="One-time link"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <LinkModal open={open} handleClose={handleClose} link={link} />
    </Container>
  );
};

export default TextForm;
