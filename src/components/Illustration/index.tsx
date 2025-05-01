import Box from '@mui/material/Box';
import React from 'react';

interface IllustrationProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

function Illustration({ src, alt = '', width = 'auto', height = 'auto', ...props }: IllustrationProps) {  
  return (
    <Box 
      component="img" 
      src={src}
      alt={alt} 
      sx={{ 
        width, 
        height,
        objectFit: 'contain'
      }} 
      {...props}
    />
  );
}

export default Illustration;
