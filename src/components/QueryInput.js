import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Paper, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';

function QueryInput({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  const exampleRecommendationQueries = [
    "Show me SUVs under $30,000",
    "I need a family car with good safety features",
    "What's a good electric car with long range?"
  ];

  const exampleMaintenanceQueries = [
    "When should I change my oil?",
    "How often should I rotate my tires?",
    "When to replace brake pads?"
  ];

  const handleExampleClick = (example) => {
    setQuery(example);
    onSubmit(example);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        fullWidth
        label="Ask anything about cars or maintenance"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        size="large"
        disabled={!query.trim()}
      >
        Get Answer
      </Button>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Try these example queries:
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Car Recommendations</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {exampleRecommendationQueries.map((example, index) => (
                <Chip 
                  key={index} 
                  label={example} 
                  onClick={() => handleExampleClick(example)} 
                  clickable 
                />
              ))}
            </Box>
          </Box>
          
          <Box>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              <BuildIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Maintenance Questions</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {exampleMaintenanceQueries.map((example, index) => (
                <Chip 
                  key={index} 
                  label={example} 
                  onClick={() => handleExampleClick(example)} 
                  clickable 
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default QueryInput;
