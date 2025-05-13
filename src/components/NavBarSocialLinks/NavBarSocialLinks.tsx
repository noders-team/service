import React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaGithub, FaGlobe, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import IconLink from '@/components/IconLink';

export default function NavBarSocialLinks(props: any): React.JSX.Element {
  const isMobile = props?.mobile === true;
  const isDesktop = useMediaQuery('(min-width: 997px)');

  if (!isMobile && !isDesktop) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" gap={2} pl={isDesktop ? 0 : 1}>
      <IconLink icon={FaGlobe} size={24} href="https://noders.team" title="noders.team" />
      <IconLink icon={FaGithub} size={24} href="https://github.com/noders-team" title="Github" />
      <IconLink icon={FaXTwitter} size={24} href="https://x.com/NODERS_TEAM" title="X.com" />
      <IconLink icon={FaTelegram} size={24} href="https://t.me/nodersteam" title="Telegram" />
    </Box>
  );
}
