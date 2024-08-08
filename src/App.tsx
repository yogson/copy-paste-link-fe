import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextForm from './components/TextForm';
import RetrieveText from './components/RetrieveText';
import { Box } from '@mui/material';
import './App.css';
import RetrieveByCode from './components/RetrieveByCode';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="content">
          <Routes>
            <Route path="/get/:id" element={<RetrieveText />} />
            <Route path="/by-code" element={<RetrieveByCode />} />
            <Route path="/" element={<TextForm />} />
          </Routes>
        </div>
      </Box>
    </Router>
  );
};

export default App;
