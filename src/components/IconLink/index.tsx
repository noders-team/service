import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

type Props = {
  icon: React.ElementType;
  href: string;
  size?: number | string;
  target?: string;
  title?: string;
  opacity?: number;
}

export default function IconLink({ icon: IconComponent, href, size, target, title, opacity }: Props): React.JSX.Element {
  const iconStyle = {
    color: 'inherit',
    opacity: opacity || 0.6,
    width: size,
    height: size,
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
      <Box
        component={IconComponent}
        display="block"
        width="100%"
        height="100%"
      />
    </Box>
  );
}
