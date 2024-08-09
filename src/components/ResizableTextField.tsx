import React, { useState, useEffect, forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface ResizableTextFieldProps extends Omit<TextFieldProps, 'rows' | 'multiline' | 'fullWidth' | 'margin'> {
  baseRowHeight?: number;
  minRows?: number;
}

const ResizableTextField = forwardRef<HTMLDivElement, ResizableTextFieldProps>(
  ({ baseRowHeight = 24, minRows = 5, onChange, ...props }, ref) => {
    const [rows, setRows] = useState(minRows);

    const calculateRows = () => {
      const padding = 10; // Adjust based on the total padding/margin in pixels
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

    return (
      <TextField
        {...props}
        ref={ref} // Pass the ref down to the TextField component
        rows={rows}
        multiline
        fullWidth
        margin="normal"
        onChange={onChange}
      />
    );
  }
);

export default ResizableTextField;
