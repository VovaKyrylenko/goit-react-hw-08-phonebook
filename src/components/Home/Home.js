import React from 'react';
import { StyledBox, StyledTypography } from './Home.styled';

// Компонент Home
const Home = () => {
  return (
    <StyledBox>
      <StyledTypography variant="h2" align="center">
        Welcome to phone book☎️. Log in to add contacts.
      </StyledTypography>
    </StyledBox>
  );
};

export default Home;
