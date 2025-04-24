import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

function MaintenanceInfo({ data }) {
  const { query, answer, relatedTopics } = data;
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Maintenance Information
      </Typography>
      
      <Box sx={{ mb: 4, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Your Question:
        </Typography>
        <Typography variant="body1">
          "{query}"
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BuildIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5">Answer</Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          {answer}
        </Typography>
        
        {relatedTopics && relatedTopics.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Related Maintenance Topics:
            </Typography>
            
            <Box component="ul" sx={{ pl: 2 }}>
              {relatedTopics.map((topic, index) => (
                <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                  {topic}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default MaintenanceInfo;