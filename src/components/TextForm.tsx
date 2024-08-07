import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';

interface IFormInput {
  text: string;
  oneTime: boolean;
}

interface TextFormProps {
  onSubmit: SubmitHandler<IFormInput>;
}

const TextForm: React.FC<TextFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default TextForm;
