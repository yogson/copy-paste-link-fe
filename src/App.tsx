import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextForm from './components/TextForm';
import RetrieveText from './components/RetrieveText';
import { Container, Box } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ flexGrow: 1 }}>
        <div className="content">
          <Routes>
            <Route path="/get/:id" element={<RetrieveText />} />
            <Route path="/" element={<TextForm />} />
          </Routes>
          </div>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
