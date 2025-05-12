import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Chain } from '@/types/Chain';
import chainService from '@/service/chainService';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Illustration from '@/components/Illustration';

type Props = {
  scope: string;
};

function Overview({ scope }: Props): React.JSX.Element {
  const [chains, setChains] = React.useState<Chain[]>([]);
  const chainsUrl = useBaseUrl('chains.json');

  React.useEffect(() => {
    const promise =
      scope === 'mainnet' ? chainService.getMainnetChains(chainsUrl) : chainService.getTestnetChains(chainsUrl);
    promise
      .then((chains) => {
        setChains(chains);
      })
      .catch((error) => {
        console.error('Error fetching chains:', error);
      });
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="320px"
        padding={4}
        sx={{
          borderRadius: (theme) => theme.spacing(3),
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h3">Mainnet networks</Typography>
          <Typography variant="body1">
            Our service is designed to empower developers and enthusiasts alike with detailed, step-by-step guides for
            running and maintaining nodes
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
              minWidth: { sx: '145px', sm: '160px' },
            }}
          >
            <Typography variant="overline">Networks</Typography>
            <Typography variant="h6">{chains.length}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="overline">Type</Typography>
            <Box px={1} py={0.5} bgcolor="background.paper" borderRadius={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Cosmos
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" pt={6} gap={3}>
        <Typography variant="h4" sx={{ fontSize: '32px', fontWeight: 500, lineHeight: '40px' }}>
          Our service includes
        </Typography>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box display="flex" flex={1} gap={5} paddingY={3} paddingX={2}>
              <Box display="flex" alignItems="flex-start" sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/sync.svg" alt="Sync" width={114} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                  Sync
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Fresh Snapshots
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — State Sync
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Live Peers & Addrbooks
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Seed nodes
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              flex={1}
              gap={5}
              paddingY={3}
              paddingLeft={3}
              sx={{
                borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box display="flex" alignItems="flex-start" sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/endpoints.svg" alt="Sync" width={114} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                  Endpoints
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — API
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — RPC
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — gRPC
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Public Endpoints
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box display="flex" flex={1} gap={5} paddingY={3} paddingX={2}>
              <Box display="flex" alignItems="flex-start" sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/explorer.svg" alt="Sync" width={114} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                  Explorers & Tools
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Explorers
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Faucet
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — and other Useful Tools
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              flex={1}
              gap={5}
              paddingY={3}
              paddingLeft={3}
              sx={{
                borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box display="flex" alignItems="flex-start" sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/guides.svg" alt="Sync" width={114} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                  Guides
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Installation
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — Upgrade
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                  — CLI Cheatsheet
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Overview;
