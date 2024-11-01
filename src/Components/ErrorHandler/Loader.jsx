/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/system';


const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoaderContainer = styled(Box)({
  position: 'absolute',
  top: '100px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const LoaderCircle = styled(Box)(({ delay }) => ({
  width: '40px',
  height: '40px',
  backgroundColor: 'white',
  borderRadius: '50%',
  animation: `${pulse} 1.2s infinite`,
  border: '2px solid black',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.5)', 
  },
}));

const LoaderWrapper = styled(Box)({
  display: 'flex',
  gap: '20px',
});

function Loader() {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <LoaderCircle delay="0s" />
        <LoaderCircle delay="0.1s" />
        <LoaderCircle delay="0.2s" />
        <LoaderCircle delay="0.3s" />
      </LoaderWrapper>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          letterSpacing: '8px',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        }}
      >
        Loading...
      </Typography>
    </LoaderContainer>
  );
}

export default Loader;
