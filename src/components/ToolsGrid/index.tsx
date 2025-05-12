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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from '@docusaurus/router';

type ToolCardProps = {
  icon: React.ComponentType<IconBaseProps>;
  linkUrl: string;
  title: string;
};

function ToolCard({ icon: Icon, linkUrl, title }: ToolCardProps): React.ReactElement {
  const history = useHistory();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleClick = (url: string) => {
    history.push(url);
  };

  return (
    <SimpleCard
      flexDirection="column"
      gap={3}
      padding={isMobile ? 2 : 3}
      cursor="pointer"
      height="100%"
      onClick={() => handleClick(linkUrl)}
    >
      <Icon size={32} opacity={0.2} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 'normal' }}>
          {title}
        </Typography>
        <PiArrowRightBold size={24} opacity={0.2} />
      </Box>
    </SimpleCard>
  );
}

type ToolsGridProps = {
  chainName: string;

  // Node Installation
  showInstall: boolean;
  showUpgrade: boolean;
  showGenesis: boolean;
  showCli: boolean;

  // Endpoints and Sync
  showEndpoints: boolean;
  showStateSync: boolean;
  showSnapshot: boolean;
  showLivePeers: boolean;
  showSeed: boolean;
  showAddressBook: boolean;

  // Tools
  showExplorersList: boolean;
  showPublicEndpoints: boolean;
  showUsefulTools: boolean;
  showUpgradeWatcher: boolean;
};

function ToolsGrid(props: ToolsGridProps): React.ReactElement {
  const theme = useTheme();
  const { chainName } = props;

  const showNodeInstallation = props.showInstall || props.showUpgrade || props.showGenesis || props.showCli;
  const showEndpointsAndSync =
    props.showEndpoints ||
    props.showStateSync ||
    props.showSnapshot ||
    props.showLivePeers ||
    props.showSeed ||
    props.showAddressBook;
  const showTools =
    props.showExplorersList || props.showPublicEndpoints || props.showUsefulTools || props.showUpgradeWatcher;

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      {showNodeInstallation && (
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
            {props.showInstall && <ToolCard icon={PiBookOpenText} linkUrl="install" title="Installation Guide" />}
            {props.showUpgrade && <ToolCard icon={PiFileCode} linkUrl="upgrade" title="Upgrade Guide" />}
            {props.showGenesis && (
              <ToolCard icon={PiAtom} linkUrl="install#download-genesis-and-addrbook" title="Genesis File" />
            )}
            {props.showCli && <ToolCard icon={PiTerminalWindow} linkUrl="cli-cheatsheet" title="CLI Cheatsheet" />}
          </Box>
        </Box>
      )}

      {showEndpointsAndSync && (
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
            {props.showEndpoints && <ToolCard icon={PiGraph} linkUrl="endpoints" title="RPC, API, gRPC" />}
            {props.showStateSync && <ToolCard icon={PiLightning} linkUrl="statesync" title="State Sync" />}
            {props.showSnapshot && <ToolCard icon={PiDatabase} linkUrl="snapshot" title="Node Snapshot" />}
            {props.showLivePeers && <ToolCard icon={PiGitPullRequest} linkUrl="seeds-and-peers" title="Live Peers" />}
            {props.showSeed && <ToolCard icon={PiFediverseLogo} linkUrl="seeds-and-peers" title="Seed Node" />}
            {props.showAddressBook && (
              <ToolCard icon={PiFediverseLogo} linkUrl="seeds-and-peers#address-book" title="Address Book" />
            )}
          </Box>
        </Box>
      )}

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
            {props.showExplorersList && <ToolCard icon={PiCubeFocus} linkUrl="explorers" title="Explorers list" />}
            {props.showPublicEndpoints && (
              <ToolCard icon={PiBroadcast} linkUrl="public-endpoints" title="Public Endpoints" />
            )}
            {props.showUsefulTools && <ToolCard icon={PiToolbox} linkUrl="useful-tools" title="Useful Tools" />}
            {props.showUpgradeWatcher && <ToolCard icon={PiTarget} linkUrl="upgrade-watcher" title="Upgrade Watcher" />}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ToolsGrid;
