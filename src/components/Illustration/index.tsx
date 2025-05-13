import Box from '@mui/material/Box';
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface IllustrationProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

function Illustration({ src, alt = '', width = 'auto', height = 'auto', ...props }: IllustrationProps) {
  const basedSrcUrl = useBaseUrl(src);

  return (
    <Box
      component="img"
      src={basedSrcUrl}
      alt={alt}
      sx={{
        width,
        height,
        objectFit: 'contain',
      }}
      {...props}
    />
  );
}

export default Illustration;
