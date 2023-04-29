import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';

// Ключові кадри анімації
export const flyIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Стилі для компонента
export const StyledBox = styled(Box)`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTypography = styled(Typography)`
  animation: ${flyIn} 1s ease-in-out;
`;
