import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import './App.css';
import QueryInput from './components/QueryInput';
import CarRecommendations from './components/CarRecommendations';
import MaintenanceInfo from './components/MaintenanceInfo';
import dummyData from './data/dummyData.json';

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showDemoData, setShowDemoData] = useState(true);

  // Load dummy data on initial render
  useEffect(() => {
    if (showDemoData) {
      // Show car recommendations by default
      setResponse({
        type: 'car_recommendation',
        data: dummyData.carRecommendations
      });
    }
  }, [showDemoData]);

  const processQuery = async (query) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const lowerCaseQuery = query.toLowerCase();
      
      // Check if the query is related to maintenance
      const isMaintenanceQuery = 
        lowerCaseQuery.includes('oil') || 
        lowerCaseQuery.includes('maintenance') || 
        lowerCaseQuery.includes('change') ||
        lowerCaseQuery.includes('replace') ||
        lowerCaseQuery.includes('how often') ||
        lowerCaseQuery.includes('brake') ||
        lowerCaseQuery.includes('tire');
      
      if (isMaintenanceQuery) {
        // Select appropriate maintenance data based on query keywords
        let maintenanceData;
        
        if (lowerCaseQuery.includes('oil')) {
          maintenanceData = dummyData.maintenanceInfo.queries.oil;
        } else if (lowerCaseQuery.includes('tire')) {
          maintenanceData = dummyData.maintenanceInfo.queries.tires;
        } else if (lowerCaseQuery.includes('brake')) {
          maintenanceData = dummyData.maintenanceInfo.queries.brakes;
        } else {
          // Default to oil change if no specific match
          maintenanceData = dummyData.maintenanceInfo.queries.oil;
        }
        
        setResponse({
          type: 'maintenance_info',
          data: {
            ...maintenanceData,
            query: query // Use the original query text
          }
        });
      } else {
        // For car recommendations
        setResponse({
          type: 'car_recommendation',
          data: {
            ...dummyData.carRecommendations,
            query: query // Use the original query text
          }
        });
      }
      
      setLoading(false);
    }, 800); // Simulate network delay
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