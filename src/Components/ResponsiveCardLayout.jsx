/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import backgroundImage from '../assets/backgroundImage.webp'; // Ensure your path is correct


// eslint-disable-next-line react/prop-types
export default function ResponsiveCardLayout({ item}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          boxShadow: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '16px' }}>
          <Typography variant="h6" component="h2" color="text.primary">
            {item}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
