import useBaseUrl from '@docusaurus/useBaseUrl';
import { Box } from '@mui/material';
import React from 'react';

interface IllustrationProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

function Illustration({ src, alt = '', width = 'auto', height = 'auto', ...props }: IllustrationProps) {
  const imageSrc = useBaseUrl(src);
  
  return (
    <Box 
      component="img" 
      src={imageSrc} 
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
