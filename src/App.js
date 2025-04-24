
// src/App.js
import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import './App.css';
import QueryInput from './components/QueryInput';
import CarRecommendations from './components/CarRecommendations';
import MaintenanceInfo from './components/MaintenanceInfo';

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const processQuery = async (query) => {
    setLoading(true);
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error processing query:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Car Adviser
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Ask about car recommendations or maintenance
        </Typography>
      </Box>

      <QueryInput onSubmit={processQuery} />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {response && !loading && (
        <Box sx={{ mt: 4 }}>
          {response.type === 'car_recommendation' ? (
            <CarRecommendations data={response.data} />
          ) : (
            <MaintenanceInfo data={response.data} />
          )}
        </Box>
      )}
    </Container>
  );
}

export default App;
