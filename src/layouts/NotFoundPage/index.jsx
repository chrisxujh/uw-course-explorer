import React from 'react';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import { Container, Box, Typography } from '@material-ui/core';

export default function () {
  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" paddingTop={8}>
        <div>
          <Box display="flex" justifyContent="center" marginBottom={4}>
            <SentimentDissatisfiedIcon style={{ fontSize: 80 }} />
          </Box>
          <Typography variant="h6">
            The page you requested is not found.
          </Typography>
        </div>
      </Box>
    </Container>
  );
}
