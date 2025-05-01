import useBaseUrl from '@docusaurus/useBaseUrl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChainsGrid from '@site/src/components/ChainsGrid';
import ServicesCards from '@site/src/components/ServicesCards';
import Illustration from '@site/src/components/Illustration';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useTheme } from '@mui/material';

function Home() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const padding = isDesktop ? 8 : 5;

  return (
    <Container maxWidth="lg" disableGutters={!isDesktop}>
      <Box
        display="flex"
        flexDirection="column"
        borderLeft={1}
        borderRight={1}
        borderColor="divider"
      >
        <Box
          display="flex"
          pl={padding}
          gap={3}
          alignItems="center"
          sx={{
            backgroundImage: 'url("img/home-page/anim-bg.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
            backgroundSize: 'auto 100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="img/home-page/anim-blocks.webp"
            alt=""
            sx={{
              position: "absolute",
              zIndex: 0,
              objectFit: "cover",
              animation: "rotateBg 20s linear infinite",
              top: "50%",
              left: "70%",
              minWidth: "220px",
              minHeight: "220px",
              "@keyframes rotateBg": {
                "0%": {
                  transform: "translate(-50%, -50%) rotate(0deg)",
                },
                "100%": {
                  transform: "translate(-50%, -50%) rotate(360deg)",
                },
              },
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            py={10}
            flex={1}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Typography variant="h3">Validator servises</Typography>
            <Typography variant="subtitle1" sx={{opacity: 0.6}}>Noders Team provides a stable, reliable infrastructure
              for web3 projects, supporting them at all stages of development: starting with testnet
              and continuing into the mainnet</Typography>

            <Box display="flex" gap={2}>
              <Button variant="contained" href={useBaseUrl('mainnet-networks/overview')}
                      endIcon={<FaArrowRight size={14}/>}>Mainnet Networks</Button>
              <Button variant="outlined" href={useBaseUrl('testnet-networks/overview')}
                      endIcon={<FaArrowRight size={14}/>}>Testnet Networks</Button>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', zIndex: 1, display: {xs: 'none', md: 'flex'} }}>
            <ServicesCards/>
          </Box>
        </Box>

        <Box display="flex" borderTop={1} borderBottom={1} borderColor="divider" sx={{paddingX: {xs: 0, md: 5, lg: 8}}}>
          <Box
            display="grid"
            gridTemplateColumns={isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'}
            width="100%"
          >
            <Box
              display="flex"
              flexDirection={isDesktop ? 'column' : 'row'}
              gap={2}
              p={3}
              borderRight={1}
              borderBottom={!isDesktop ? 1 : 0}
              borderColor="divider"
            >
              <Box display="flex" pb={1}>
                <Illustration src="img/home-page/endpoints.svg" alt="Endpoints" width={112}/>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Typography variant="h6">Endpoints</Typography>
                <Typography variant="body2" sx={{opacity: 0.6}}>API, RPC, gRPC</Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection={isDesktop ? 'column' : 'row'}
              gap={2}
              p={3}
              borderRight={isDesktop ? 1 : 0}
              borderBottom={!isDesktop ? 1 : 0}
              borderColor="divider"
            >
              <Box display="flex" pb={1}>
                <Illustration src="img/home-page/sync.svg" alt="Sync" width={114}/>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Typography variant="h6">Sync</Typography>
                <Typography variant="body2" sx={{opacity: 0.6}}>Snapshot, State Sync, Peers, Seed</Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection={isDesktop ? 'column' : 'row'}
              gap={2}
              p={3}
              borderRight={1}
              borderColor="divider"
            >
              <Box display="flex" pb={1}>
                <Illustration src="img/home-page/explorer.svg" alt="Explorers" width={112}/>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Typography variant="h6">Explorers</Typography>
                <Typography variant="body2" sx={{opacity: 0.6}}>Faucet, Bots and other Useful Tools</Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection={isDesktop ? 'column' : 'row'}
              gap={2}
              p={3}
            >
              <Box display="flex" pb={1}>
                <Illustration src="img/home-page/guides.svg" alt="Guides" width={108}/>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Typography variant="h6">Guides</Typography>
                <Typography variant="body2" sx={{opacity: 0.6}}>Clear Installation and Upgrade Guides </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" px={padding} pt={8} pb={15}>
          <ChainsGrid/>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
