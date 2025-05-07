import React from 'react';
import Box from '@mui/material/Box';
import {
  PiArrowRightBold,
  PiAtom,
  PiBookOpenText,
  PiBroadcast,
  PiCubeFocus,
  PiDatabase,
  PiFediverseLogo,
  PiFileCode,
  PiGearSixFill,
  PiGitPullRequest,
  PiGraph,
  PiLightning,
  PiTarget,
  PiTerminalFill,
  PiTerminalWindow,
  PiToolbox,
  PiWifiHighBold,
} from 'react-icons/pi';
import Typography from '@mui/material/Typography';
import SimpleCard from '@/components/SimpleCard';
import { IconBaseProps } from 'react-icons';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

type ToolCardProps = {
  icon: React.ComponentType<IconBaseProps>;
  linkUrl: string;
  title: string;
};

function ToolCard({ icon: Icon, linkUrl, title }: ToolCardProps): React.ReactElement {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Link to={linkUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
      <SimpleCard
        flexDirection="column"
        gap={3}
        padding={isMobile ? 2 : 3}
        borderRadius={2}
        cursor="pointer"
        height="100%"
      >
        <Icon size={32} opacity={0.2} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 'normal' }}>
            {title}
          </Typography>
          <PiArrowRightBold size={24} opacity={0.2} />
        </Box>
      </SimpleCard>
    </Link>
  );
}

type ToolsGridProps = {
  chainName: string;
};

function ToolsGrid({ chainName }: ToolsGridProps): React.ReactElement {
  const theme = useTheme();

  // TODO: enable when implemented
  const showTools = false;

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <PiTerminalFill size={32} color={theme.palette.primary.main} />
          <Typography variant="h5">Node Installation</Typography>
        </Box>
        <Box
          display="grid"
          gap={2}
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          <ToolCard icon={PiBookOpenText} linkUrl={chainName + '/install'} title="Installation Guide" />
          <ToolCard icon={PiFileCode} linkUrl={chainName + '/upgrade'} title="Upgrade Guide" />
          <ToolCard icon={PiAtom} linkUrl={chainName + '/install#download-genesis-and-addrbook'} title="Genesis File" />
          <ToolCard icon={PiTerminalWindow} linkUrl={chainName + '/cli-cheatsheet'} title="CLI Cheatsheet" />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <PiWifiHighBold size={32} color={theme.palette.primary.main} />
          <Typography variant="h5">Endpoints & Sync</Typography>
        </Box>
        <Box
          display="grid"
          gap={2}
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          <ToolCard icon={PiGraph} linkUrl={chainName + '/endpoints'} title="RPC, API, gRPC" />
          <ToolCard icon={PiLightning} linkUrl={chainName + '/statesync'} title="State Sync" />
          <ToolCard icon={PiDatabase} linkUrl={chainName + '/snapshot'} title="Node Snapshot" />
          <ToolCard icon={PiGitPullRequest} linkUrl={chainName + '/seeds-and-peers'} title="Live Peers" />
          <ToolCard icon={PiFediverseLogo} linkUrl={chainName + '/seeds-and-peers'} title="Seed Node" />
          <ToolCard icon={PiFediverseLogo} linkUrl={chainName + '/seeds-and-peers#address-book'} title="Address Book" />
        </Box>
      </Box>

      {showTools && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2}>
            <PiGearSixFill size={32} color={theme.palette.primary.main} />
            <Typography variant="h5">Tools</Typography>
          </Box>
          <Box
            display="grid"
            gap={2}
            sx={{
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            <ToolCard icon={PiCubeFocus} linkUrl={chainName + '/explorers'} title="Explorers list" />
            <ToolCard icon={PiBroadcast} linkUrl={chainName + '/public-endpoints'} title="Public Endpoints" />
            <ToolCard icon={PiToolbox} linkUrl={chainName + '/useful-tools'} title="Useful Tools" />
            <ToolCard icon={PiTarget} linkUrl={chainName + '/upgrade-watcher'} title="Upgrade Watcher" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ToolsGrid;
