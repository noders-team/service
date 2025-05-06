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

type ToolCardProps = {
  icon: React.ComponentType<IconBaseProps>;
  linkUrl: string;
  title: string;
};

function ToolCard({ icon: Icon, linkUrl, title }: ToolCardProps): React.ReactElement {
  return (
    <Link to={linkUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
      <SimpleCard flexDirection="column" gap={3} padding={3} borderRadius={2} cursor="pointer">
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

function ToolsGrid(): React.ReactElement {
  const theme = useTheme();
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
          <ToolCard icon={PiBookOpenText} linkUrl="" title="Installation Guide" />
          <ToolCard icon={PiFileCode} linkUrl="" title="Upgrade Guide" />
          <ToolCard icon={PiAtom} linkUrl="" title="Genesis File" />
          <ToolCard icon={PiTerminalWindow} linkUrl="" title="CLI Cheatsheet" />
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
          <ToolCard icon={PiGraph} linkUrl="" title="RPC, API, gRPC" />
          <ToolCard icon={PiLightning} linkUrl="" title="State Sync" />
          <ToolCard icon={PiDatabase} linkUrl="" title="Node Snapshot" />
          <ToolCard icon={PiGitPullRequest} linkUrl="" title="Live Peers" />
          <ToolCard icon={PiFediverseLogo} linkUrl="" title="Seed Node" />
          <ToolCard icon={PiFediverseLogo} linkUrl="" title="Address Book" />
        </Box>
      </Box>

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
          <ToolCard icon={PiCubeFocus} linkUrl="" title="Explorers list" />
          <ToolCard icon={PiBroadcast} linkUrl="" title="Public Endpoints" />
          <ToolCard icon={PiToolbox} linkUrl="" title="Useful Tools" />
          <ToolCard icon={PiTarget} linkUrl="" title="Upgrade Watcher" />
        </Box>
      </Box>
    </Box>
  );
}

export default ToolsGrid;
