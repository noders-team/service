import React from "react";
import Box from "@mui/material/Box";

function SimpleCard(props): React.JSX.Element {
  const { children, cursor, ...rest } = props;
  
  return (
    <Box 
      display="flex" 
      backgroundColor="background.paper" 
      overflow="hidden" 
      sx={{ 
        cursor: cursor || 'default',
        '&:hover': {
          cursor: cursor || 'default'
        }
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default SimpleCard
