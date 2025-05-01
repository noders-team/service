import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaTelegram, FaXTwitter, FaGithub, FaGlobe } from 'react-icons/fa6';

export default function NavBarSocialLinks(props: any): JSX.Element {
  const isMobile = props?.mobile === true;
  const isDesktop = useMediaQuery('(min-width: 997px)');

  if (!isMobile && !isDesktop) {
    return null;
  }

  const iconStyle = {
    color: 'var(--ifm-navbar-link-color)',
    opacity: 0.6,
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 1,
      color: 'var(--ifm-navbar-link-hover-color)',
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      pl={isDesktop ? 0 : 1}
    >
      <Box component={Link} href="https://noders.team" target="_blank" rel="noopener noreferrer" aria-label="noders.team" title='Noders.team' sx={iconStyle}>
        <FaGlobe />
      </Box>
      <Box component={Link} href="https://github.com/noders-team" target="_blank" rel="noopener noreferrer" aria-label="github" title='Github' sx={iconStyle}>
        <FaGithub />
      </Box>
      <Box component={Link} href="https://x.com/NODERS_TEAM" target="_blank" rel="noopener noreferrer" aria-label="x.com" title='X.com' sx={iconStyle}>
        <FaXTwitter />
      </Box>
      <Box component={Link} href="https://t.me/nodersteam" target="_blank" rel="noopener noreferrer" aria-label="telegram" title='Telegram' sx={iconStyle}>
        <FaTelegram />
      </Box>
    </Box>
  );
}
