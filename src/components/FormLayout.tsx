// src/components/FormLayout.tsx
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import ResizableTextField from './ResizableTextField';

interface FormLayoutProps {
  title: string;
  textValue: string;
  onTextChange: (value: string) => void;
  textLabel: string;
  baseRowHeight?: number;
  minRows?: number;
  children?: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  textValue,
  onTextChange,
  textLabel,
  baseRowHeight = 24,
  minRows = 5,
  children,
}) => {
  return (
    <Box sx={{ width: '98%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 1200 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <ResizableTextField
          value={textValue}
          onChange={(e) => onTextChange(e.target.value)}
          label={textLabel}
          baseRowHeight={baseRowHeight}
          minRows={minRows}
        />
        <Box component="form" sx={{ width: '100%' }}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default FormLayout;
