import useBaseUrl from '@docusaurus/useBaseUrl';
import { Box, Typography, Button, Container } from '@mui/material';
import ChainsGrid from '@site/src/components/ChainsGrid';
import HeroAnimation from '@site/src/components/HeroAnimation';
import Illustration from '@site/src/components/Illustration';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        border={1}
        borderColor="divider"
      >
        <Box
          display="flex"
          px={8}
          gap={2}
          alignItems="center"
          sx={{
            backgroundImage: 'url("img/home-page/anim-bg.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
            backgroundSize: 'auto 100%',
            position: 'relative',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            py={10}
            flex={1}
          >
            <Typography variant="h3">Validator servises</Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>Noders Team provides a stable, reliable infrastructure for web3 projects, supporting them at all stages of development: starting with testnet
              and continuing into the mainnet</Typography>

            <Box display="flex" gap={2}>
              <Button variant="contained" href={useBaseUrl('mainnet-networks/overview')} endIcon={<FaArrowRight size={14} />}>Mainnet Networks</Button>
              <Button variant="outlined" href={useBaseUrl('testnet-networks/overview')} endIcon={<FaArrowRight size={14} />}>Testnet Networks</Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" py={5} flex={1}>
            <HeroAnimation />
          </Box>
        </Box>

        <Box display="flex" px={8} borderTop={1} borderBottom={1} borderColor="divider">
          <Box display="flex" flexDirection="column" flex={1} gap={1} pr={2} py={3} borderRight={1} borderColor="divider">
            <Box display="flex" pb={1}>
              <Illustration src="img/home-page/endpoints.svg" alt="Endpoints" width={112} />
            </Box>
            <Typography variant="h6">Endpoints</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>API, RPC, gRPC</Typography>
          </Box>
          <Box display="flex" flexDirection="column" flex={1} gap={1} px={2} py={3} borderRight={1} borderColor="divider">
            <Box display="flex" pb={1}>
              <Illustration src="img/home-page/sync.svg" alt="Sync" width={114} />
            </Box>
            <Typography variant="h6">Sync</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Snapshot, State Sync, Peers, Seed</Typography>
          </Box>
          <Box display="flex" flexDirection="column" flex={1} gap={1} px={2} py={3} borderRight={1} borderColor="divider">
            <Box display="flex" pb={1}>
              <Illustration src="img/home-page/explorer.svg" alt="Explorers" width={112} />
            </Box>
            <Typography variant="h6">Explorers</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Faucet, Bots and other Useful Tools</Typography>
          </Box>
          <Box display="flex" flexDirection="column" flex={1} gap={1} pl={2} py={3}>
            <Box display="flex" pb={1}>
              <Illustration src="img/home-page/guides.svg" alt="Guides" width={108} />
            </Box>
            <Typography variant="h6">Guides</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Clear Installation and Upgrade Guides </Typography>
          </Box>
        </Box>

        <Box display="flex" px={8} py={8}>
          <ChainsGrid />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
