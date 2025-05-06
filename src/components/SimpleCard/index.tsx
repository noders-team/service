import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

function SimpleCard(props): React.JSX.Element {
  const { children, cursor, borderRadius, ...rest } = props;
  const theme = useTheme();

  return (
    <Box
      display="flex"
      backgroundColor="background.paper"
      overflow="hidden"
      sx={{
        cursor: cursor,
        borderRadius: theme.spacing(borderRadius),
        '&:hover': {
          cursor: cursor,
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default SimpleCard;
