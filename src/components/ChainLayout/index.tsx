import React from 'react';
import Box from '@mui/material/Box';

function ChainLayout(props) {
  return (
    <Box display="flex" flexDirection="column" gap={5} maxWidth={970} margin="auto">
      {props.children}
    </Box>
  );
}

export default ChainLayout;
