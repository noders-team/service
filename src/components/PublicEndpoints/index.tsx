import Box from '@mui/material/Box';
import React from 'react';
import Typography from '@mui/material/Typography';

type Props = {
  chainId: string;
};

function PublicEndpoints({ chainId }: Props): React.JSX.Element {
  return (
    <Box display="flex" flexDirection="column" gap={2} pt={2}>
      <Typography variant="h6">Public Endpoints</Typography>
      <Typography variant="body1">{chainId}</Typography>
    </Box>
  );
}

export default PublicEndpoints;
