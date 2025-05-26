import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
  cursor?: string;
  borderRadius?: number;
};

function SimpleCard(props): React.JSX.Element {
  const { children, cursor, borderRadius = 2, ...rest }: Props = props;
  const theme = useTheme();

  return (
    <Box
      display="flex"
      overflow="hidden"
      sx={{
        backgroundColor: 'background.paper',
        cursor: cursor,
        borderRadius: theme.spacing(borderRadius),
        transition: theme.transitions.create('background-color'),
        '&:hover': {
          cursor: cursor,
          backgroundColor: '#22252A',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default SimpleCard;
