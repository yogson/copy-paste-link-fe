import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFormState, Controller } from 'react-hook-form';
import { Button, FormControlLabel, Checkbox, Typography, Paper, Box, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { sendText } from '../api/textApi';
import LinkModal from './LinkModal';
import { Link } from 'react-router-dom';
import ResizableTextField from './ResizableTextField';

interface IFormInput {
  text: string;
  oneTime: boolean;
  shortCode: boolean;
}

const TextForm: React.FC = () => {
  const { register, control, handleSubmit, reset, setValue, watch } = useForm<IFormInput>({
    defaultValues: { text: '', oneTime: false, shortCode: false }
  });

  const { isDirty } = useFormState({
    control,
    name: 'text',
  });

  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [code, setCode] = useState('');

  const handleSuccess = (generatedLink: string, generatedCode: string) => {
    setLink(generatedLink);
    setCode(generatedCode);
    setOpen(true);
  };

  const handleError = (error: string) => {
    console.error(error);
  };

  const handleClose = () => setOpen(false);

  const handleFormSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const [generatedLink, generatedCode] = await sendText(data);
      handleSuccess(generatedLink, generatedCode);
    } catch (error) {
      console.error('Error sending text:', error);
      handleError('Error sending text');
    }
  };

  const handleClear = () => {
    reset({ text: '', oneTime: false, shortCode: false });
  };

  return (
    <Box className="content" sx={{ width: '98%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 1200 }}>
        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <ResizableTextField
                {...field}
                label="Enter your text"
                variant="outlined"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Tooltip
                title={<Typography sx={{ fontSize: '1rem' }}>This link can only be accessed once and will expire after that.</Typography>}
                placement="top-start"
              >
                <FormControlLabel
                  control={<Checkbox {...register('oneTime')} />}
                  label="One-time link"
                  sx={{ flexGrow: 1, mb: { xs: 1, sm: 0 } }}
                />
              </Tooltip>
              <Tooltip
                title={<Typography sx={{ fontSize: '1rem' }}>The recipient will be able to open the message using a short code.</Typography>}
                placement="top-start"
              >
                <FormControlLabel
                  control={<Checkbox {...register('shortCode')} />}
                  label="Use short code"
                  sx={{ flexGrow: 1, mb: { xs: 1, sm: 0 } }}
                />
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleClear}
                startIcon={<ClearIcon />}
                sx={{ mb: { xs: 1, sm: 0 }, mr: { sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
                disabled={!isDirty}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isDirty}
                endIcon={<SendIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1">
          Have a short code? <Link to="/by-code">Retrieve your text here</Link>
        </Typography>
      </Box>
      <LinkModal open={open} handleClose={handleClose} link={link} code={code} />
    </Box>
  );
};

export default TextForm;
