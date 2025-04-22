import useBaseUrl from '@docusaurus/useBaseUrl';
import { Box, Typography, Button, Container } from '@mui/material';
import ChainsGrid from '@site/src/components/ChainsGrid';
import HeroAnimation from '@site/src/components/HeroAnimation';
import Illustration from '@site/src/components/Illustration';
import React from 'react';

function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Box display="flex" px={5} gap={2} alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          py={10}
        >
          <Typography variant="h3">Validator servises</Typography>
          <Typography variant="body1">Noders Team provides a stable, reliable infrastructure for web3 projects, supporting them at all stages of development: starting with testnet
            and continuing into the mainnet</Typography>

          <Box display="flex" gap={2}>
            <Button variant="contained" href={useBaseUrl('mainnet-networks/overview')}>Mainnet Networks</Button>
            <Button variant="outlined" href={useBaseUrl('testnet-networks/overview')}>Testnet Networks</Button>
          </Box>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <HeroAnimation />
        </Box>
      </Box>

      <Box display="flex" gap={2} px={5}>
        <Box display="flex" flexDirection="column" gap={1} px={2} py={1}>
          <Box display="flex" pb={1}>
            <Illustration src="img/home-page/endpoints.svg" alt="Endpoints" width={115} />
          </Box>
          <Typography variant="h4">Endpoints</Typography>
          <Typography variant="body1">API, RPC, gRPC</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} px={2} py={1}>
          <Box display="flex" pb={1}>
            <Illustration src="img/home-page/sync.svg" alt="Sync" width={115} />
          </Box>
          <Typography variant="h4">Sync</Typography>
          <Typography variant="body1">Snapshot, State Sync, Peers, Seed</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} px={2} py={1}>
          <Box display="flex" pb={1}>
            <Illustration src="img/home-page/explorer.svg" alt="Explorers" width={115} />
          </Box>
          <Typography variant="h4">Explorers</Typography>
          <Typography variant="body1">Faucet, Bots and other Useful Tools</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} px={2} py={1}>
          <Box display="flex" pb={1}>
            <Illustration src="img/home-page/guides.svg" alt="Guides" width={115} />
          </Box>
          <Typography variant="h4">Guides</Typography>
          <Typography variant="body1">Clear Installation and Upgrade Guides </Typography>
        </Box>
      </Box>

      <Box display="flex" padding={5}>
        <ChainsGrid />
      </Box>
    </Container>
  );
}

export default Home;
