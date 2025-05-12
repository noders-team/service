import React from 'react';
import Box from '@mui/material/Box';

function ChainLayout(props) {
  return (
    <Box display="flex" flexDirection="column" gap={5} pb={5}>
      {props.children}
    </Box>
  );
}

export default ChainLayout;
