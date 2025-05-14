import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Chain } from '@/types/Chain';
import chainService from '@/service/chainService';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Illustration from '@/components/Illustration';
import SimpleCard from '@/components/SimpleCard';
import { PiArrowUpRightBold, PiPlanetFill } from 'react-icons/pi';
import { FaGithub, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import Button from '@mui/material/Button';

type Props = {
  scope: string;
};

function Overview({ scope }: Props): React.JSX.Element {
  const [chains, setChains] = React.useState<Chain[]>([]);
  const chainsUrl = useBaseUrl('chains.json');
  const networksImgUrl = useBaseUrl('/img/overview-page/networks.webp');
  const blockPulseImgUrl = useBaseUrl('/img/overview-page/blockpulse.webp');

  let scopePrettyName: string;
  let bgImgUrl: string;
  let bgAnimUrl: string;
  if (scope && scope.toLowerCase() === 'mainnet') {
    scopePrettyName = 'Mainnet';
    bgImgUrl = useBaseUrl('/img/overview-page/mainnet-bg.webp');
    bgAnimUrl = useBaseUrl('/img/overview-page/mainnet-bg-anim.svg');
  } else {
    scopePrettyName = 'Testnet';
    bgImgUrl = useBaseUrl('/img/overview-page/testnet-bg.webp');
    bgAnimUrl = useBaseUrl('/img/overview-page/testnet-bg-anim.svg');
  }

  // TODO: enable
  const showBlockpulse = false;

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

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box display="flex" flexDirection="column" pb={15}>
      {/* OVERVIEW HERO */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="320px"
        padding={4}
        sx={{
          borderRadius: (theme) => theme.spacing(3),
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundImage: {
            xs: `url(${bgImgUrl})`,
            md: `url(${bgAnimUrl}), url(${bgImgUrl})`,
          },
          backgroundSize: {
            xs: 'cover',
            lg: 'contain',
          },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h3">{scopePrettyName} networks</Typography>
          <Typography variant="body1" sx={{ maxWidth: "540px", opacity: 0.6 }}>
            Our service is designed to empower developers and enthusiasts alike with detailed, step-by-step guides for
            running and maintaining nodes
          </Typography>
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
              minWidth: { xs: '145px', sm: '160px' },
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
            <Box px={1} py={0.5} bgcolor="background.paper" borderRadius={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                EVM
              </Typography>
            </Box>
            <Box px={1} py={0.5} bgcolor="background.paper" borderRadius={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Polkadot
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* OUR SERVICES */}
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
            <Box
              display="flex"
              flex={1}
              paddingY={3}
              paddingX={2}
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, sm: 3, md: 5 },
              }}
            >
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
              paddingY={3}
              paddingLeft={3}
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, sm: 3, md: 5 },
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
            <Box
              display="flex"
              flex={1}
              paddingY={3}
              paddingX={2}
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, sm: 3, md: 5 },
              }}
            >
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
              paddingY={3}
              paddingLeft={3}
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, sm: 3, md: 5 },
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

      {/* OUR VALIDATED NETWORKS */}
      <Box
        display="flex"
        mt={6}
        bgcolor="background.paper"
        borderRadius={6}
        minHeight="330px"
        overflow="hidden"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Box
          component="img"
          src={networksImgUrl}
          alt="Validated Networks"
          sx={{
            objectFit: 'cover',
            maxHeight: { xs: '240px', md: 'unset' },
            maxWidth: { xs: '100%', md: '50%' },
          }}
        />
        <Box display="flex" flexDirection="column" justifyContent="space-between" padding={5}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="overline" sx={{ fontWeight: 600 }}>
              Staking
            </Typography>
            <Typography variant="h4" sx={{ fontSize: '32px', fontWeight: 500 }}>
              Our Validated Networks
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
              Earn passive income using our non-custodial staking
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            sx={{ alignSelf: 'flex-start', mt: 2 }}
            endIcon={<PiArrowUpRightBold size={24} opacity={0.2} />}
            onClick={() => handleOpenLink('https://noders.team/networks')}
          >
            Stake with NODERS
          </Button>
        </Box>
      </Box>

      {/* OUR PRODUCTS */}
      {showBlockpulse && (
        <Box
          display="flex"
          mt={3}
          bgcolor="background.paper"
          borderRadius={6}
          minHeight="330px"
          overflow="hidden"
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Box display="flex" flexDirection="column" justifyContent="space-between" padding={5}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="overline" sx={{ fontWeight: 600 }}>
                Our Products
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '32px', fontWeight: 500 }}>
                Blockpulse
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.6 }}>
                A powerful and user-friendly blockchain explorer & analytics tool
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              sx={{ alignSelf: 'flex-start' }}
              endIcon={<PiArrowUpRightBold size={24} opacity={0.2} />}
              onClick={() => handleOpenLink('https://blockpulse.pro')}
            >
              Explore networks
            </Button>
          </Box>
          <Box
            component="img"
            src={blockPulseImgUrl}
            alt="Blockpulse"
            sx={{
              objectFit: 'cover',
              maxHeight: { xs: '240px', md: 'unset' },
              maxWidth: { xs: '100%', md: '50%' },
            }}
          />
        </Box>
      )}

      {/* SOCIAL RESOURCES */}
      <Box display="flex" flexDirection="column" pt={10}>
        <Typography variant="h4" sx={{ fontSize: '32px', fontWeight: 500, lineHeight: '40px' }}>
          Our social resources
        </Typography>
        <Typography variant="body1" sx={{ pt: 2 }}>
          Official links of social networks of NODERS LLC
        </Typography>
        <Box
          display="grid"
          pt={4}
          gap={2}
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)',
            },
          }}
        >
          <SimpleCard
            flexDirection="column"
            cursor="pointer"
            gap={3}
            padding={3}
            onClick={() => handleOpenLink('https://noders.team')}
          >
            <PiPlanetFill size={32} opacity={0.2} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Website
            </Typography>
          </SimpleCard>
          <SimpleCard
            flexDirection="column"
            cursor="pointer"
            gap={3}
            padding={3}
            onClick={() => handleOpenLink('https://github.com/noders-team')}
          >
            <FaGithub size={32} opacity={0.2} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              GitHub
            </Typography>
          </SimpleCard>
          <SimpleCard
            flexDirection="column"
            cursor="pointer"
            gap={3}
            padding={3}
            onClick={() => handleOpenLink('https://x.com/NODERS_TEAM')}
          >
            <FaXTwitter size={32} opacity={0.2} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              X
            </Typography>
          </SimpleCard>
          <SimpleCard
            flexDirection="column"
            cursor="pointer"
            gap={3}
            padding={3}
            onClick={() => handleOpenLink('https://t.me/nodersteam')}
          >
            <FaTelegram size={32} opacity={0.2} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Telegram
            </Typography>
          </SimpleCard>
        </Box>
      </Box>
    </Box>
  );
}

export default Overview;
