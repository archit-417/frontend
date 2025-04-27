import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Chip, Divider } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CarRecommendations({ data }) {
  const { query, criteria, cars } = data;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Car Recommendations
      </Typography>
      
      <Box sx={{ mb: 4, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Your Query:
        </Typography>
        <Typography variant="body1" gutterBottom>
          "{query}"
        </Typography>

        {criteria && Object.keys(criteria).length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
              We identified these criteria:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {criteria.type && (
                <Chip 
                  label={`Type: ${criteria.type}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              )}
              {criteria.maxPrice && (
                <Chip 
                  label={`Budget: Up to ${formatCurrency(criteria.maxPrice)}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              )}
              {criteria.features && criteria.features.map((feature, idx) => (
                <Chip 
                  key={idx}
                  label={`Feature: ${feature}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      {cars.length === 0 ? (
        <Typography variant="body1">
          No cars found matching your criteria. Try adjusting your search parameters.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cars.map((car, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/api/placeholder/${Math.floor(Math.random() * 100)}`}
                  alt={`${car.make} ${car.model}`}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {car.year} {car.make} {car.model}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                    <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="h6" color="success.main">
                      {formatCurrency(car.price)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalGasStationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {car.mpg ? `${car.mpg} MPG` : 'Electric'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SpeedIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {car.type}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Key Features:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {car.features.slice(0, 4).map((feature, fidx) => (
                      <Box key={fidx} sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}