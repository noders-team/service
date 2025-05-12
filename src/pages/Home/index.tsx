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
  const bgImage = useBaseUrl('img/home-page/anim-bg.png');
  const bgImageAnimated = useBaseUrl('img/home-page/anim-blocks.webp');

  return (
    <Container maxWidth="lg" disableGutters>
      <Box display="flex" flexDirection="column" borderLeft={1} borderRight={1} borderColor="divider">
        <Box
          display="flex"
          gap={3}
          alignItems="center"
          sx={{
            backgroundImage: `url("${bgImage}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
            backgroundSize: 'auto 100%',
            position: 'relative',
            overflow: 'hidden',
            paddingLeft: { xs: 3, md: 5, lg: 8 },
          }}
        >
          <Box
            component="img"
            src={bgImageAnimated}
            alt=""
            sx={{
              position: 'absolute',
              objectFit: 'cover',
              animation: 'rotateBg 20s linear infinite',
              top: '50%',
              left: {
                xs: '95%',
                md: '72%',
              },
              maxWidth: {
                xs: '145%',
                sm: '100%',
                md: '145%',
              },
              maxHeight: {
                xs: '125%',
                sm: '150%',
                md: '150%',
              },
              '@keyframes rotateBg': {
                '0%': {
                  transform: 'translate(-50%, -50%) rotate(0deg)',
                },
                '100%': {
                  transform: 'translate(-50%, -50%) rotate(360deg)',
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
            sx={{
              position: 'relative',
              paddingRight: { xs: 3, md: 0 },
              paddingY: { xs: 8, md: 10 },
            }}
          >
            <Typography variant="h3">Validator Services</Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.6, fontWeight: 300 }}>
              Noders LLC provides a stable, reliable infrastructure for web3 projects, supporting them at all stages of
              development: starting with testnet and continuing into the mainnet
            </Typography>

            <Box display="flex" gap={2} pt={1} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
              <Button
                variant="contained"
                href={useBaseUrl('mainnet-networks/overview')}
                endIcon={<FaArrowRight size={14} />}
                size="large"
              >
                Mainnet Networks
              </Button>
              <Button
                variant="outlined"
                href={useBaseUrl('testnet-networks/overview')}
                endIcon={<FaArrowRight size={14} />}
                size="large"
              >
                Testnet Networks
              </Button>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', display: { xs: 'none', md: 'flex' } }}>
            <ServicesCards />
          </Box>
        </Box>

        <Box
          display="flex"
          borderTop={1}
          borderBottom={1}
          borderColor="divider"
          sx={{
            gap: { xs: 1, md: 2 },
            paddingX: { xs: 0, md: 5, lg: 8 },
          }}
        >
          <Box display="grid" gridTemplateColumns={isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'} width="100%">
            <Box
              display="flex"
              flexDirection={'column'}
              gap={2}
              borderRight={1}
              borderBottom={!isDesktop ? 1 : 0}
              borderColor="divider"
              sx={{
                paddingY: { xs: 2, lg: 3 },
                paddingX: { xs: 3, md: 0},
              }}
            >
              <Box display="flex" pb={1} sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/endpoints.svg" alt="Endpoints" width={112} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6">Endpoints</Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  API, RPC, gRPC
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              borderRight={isDesktop ? 1 : 0}
              borderBottom={!isDesktop ? 1 : 0}
              borderColor="divider"
              sx={{
                paddingY: { xs: 2, lg: 3 },
                paddingX: 3,
              }}
            >
              <Box display="flex" pb={1} sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/sync.svg" alt="Sync" width={114} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6">Sync</Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Snapshot, State Sync, Peers, Seed
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              borderRight={1}
              borderColor="divider"
              sx={{
                paddingY: { xs: 2, lg: 3 },
                paddingX: 3,
              }}
            >
              <Box display="flex" pb={1} sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/explorer.svg" alt="Explorers" width={112} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6">Explorers</Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Faucet, Bots and other Useful Tools
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{
                paddingY: { xs: 2, lg: 3 },
                paddingX: 3,
              }}
            >
              <Box display="flex" pb={1} sx={{ maxWidth: { xs: '30%', md: 'unset' } }}>
                <Illustration src="img/home-page/guides.svg" alt="Guides" width={108} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="h6">Guides</Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Clear Installation and Upgrade Guides{' '}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          sx={{
            paddingTop: { xs: 4, md: 6 },
            paddingBottom: { xs: 4, md: 15 },
            paddingX: { xs: 3, md: 5, lg: 8 },
          }}
        >
          <ChainsGrid />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
