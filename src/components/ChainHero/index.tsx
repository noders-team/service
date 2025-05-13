import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconLink from '@/components/IconLink';
import { FaDiscord, FaGithub, FaGlobe, FaXTwitter } from 'react-icons/fa6';
import ScopeCard from '@/components/ScopeCard';
import Divider from '@mui/material/Divider';
import CodeText from '../CodeText';
import Button from '@mui/material/Button';
import KeplrIcon from '@site/static/img/keplr-logo.svg';
import RestakeIcon from '@site/static/img/restake-logo.svg';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

type Props = {
  name: string;
  iconUrl: string;
  bgColor?: string;
  scope: string;
  chainId: string;
  nodeVersion: string;
  token?: string;
  stakeUrl: string;
  restakeUrl: string;
  websiteUrl: string;
  githubUrl: string;
  xUrl: string;
  discordUrl: string;
};

function ChainHero({
  name,
  iconUrl,
  bgColor,
  scope,
  chainId,
  nodeVersion,
  token,
  stakeUrl,
  restakeUrl,
  websiteUrl,
  githubUrl,
  xUrl,
  discordUrl,
}: Props) {
  const theme = useTheme();
  const baseIconUrl = useBaseUrl(iconUrl);
  const bgImageUrl = useBaseUrl('/img/home-page/dot-pattern.svg');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const showStakingButtons = stakeUrl || restakeUrl;

  let bgColorString = alpha(theme.palette.primary.main, 0.5);
  if (bgColor && bgColor !== '[CHAIN_BACKGROUND_COLOR]') {
    bgColorString = alpha(bgColor, 0.5);
  }

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingY={4}
      paddingX={isMobile ? 3 : 4}
      borderRadius={3}
      gap={2}
      sx={(theme) => ({
        background: `linear-gradient(
            0deg,
            transparent 0%,
            ${theme.palette.background.default} 100%
          ),
          url(${bgImageUrl}) repeat,
          ${bgColorString}`,
      })}
    >
      <Box display="flex" flexWrap="wrap" alignItems="top" justifyContent="space-between" gap={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box component="img" src={baseIconUrl} alt={name} width={50} height={50} />
          <Typography variant="h3">{name}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {websiteUrl && <IconLink icon={FaGlobe} href={websiteUrl} size={24} opacity={1} title="Website" />}
          {githubUrl && <IconLink icon={FaGithub} href={githubUrl} size={24} opacity={1} title="Github" />}
          {xUrl && <IconLink icon={FaXTwitter} href={xUrl} size={24} opacity={1} title="X" />}
          {discordUrl && <IconLink icon={FaDiscord} href={discordUrl} size={24} opacity={1} title="Discord" />}
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={1.5}>
        <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
          <Typography variant="subtitle2">Network: </Typography>
          <ScopeCard scope={scope} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
          <Typography variant="subtitle2">Chain ID: </Typography>
          <CodeText text={chainId} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
          <Typography variant="subtitle2">Current Node Version: </Typography>
          <CodeText text={nodeVersion} />
        </Box>
      </Box>

      {showStakingButtons && (
        <Box
          display="grid"
          gap={isMobile ? 1 : 2}
          paddingTop={2}
          sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}
        >
          {stakeUrl && (
            <Button
              startIcon={<KeplrIcon width={24} height={24} />}
              variant="contained"
              onClick={() => handleLinkClick(stakeUrl)}
              sx={{
                borderRadius: 2,
                boxShadow: 'none',
              }}
            >
              Stake {token} via NODERS
            </Button>
          )}
          {restakeUrl && (
            <Button
              variant="contained"
              startIcon={<RestakeIcon width={24} height={24} />}
              onClick={() => handleLinkClick(restakeUrl)}
              sx={(theme) => ({
                borderRadius: 2,
                color: '#000000',
                backgroundColor: '#ffffff',
                border: `1px solid transparent`,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: `1px solid ${theme.palette.divider}`,
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease-in-out',
                },
              })}
            >
              Auto Compounding
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ChainHero;
