import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

type Props = {
  icon: React.ReactNode;
  href: string;
  width?: number | string;
  height?: number | string;
  target?: string;
  title?: string;
}

export default function IconLink({ icon, href, width, height, target, title }: Props): React.JSX.Element {
  const iconStyle = {
    color: 'inherit',
    opacity: 0.6,
    width: width || '40px',
    height: height || '40px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      opacity: 1,
      color: 'primary.main',
    }
  };

  return (
    <Box
      component={Link}
      href={href}
      target={target || "_blank"}
      title={title}
      sx={iconStyle}
    >
      {icon}
    </Box>
  );
}
