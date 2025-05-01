import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { FaGithub, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import useBaseUrl from '@docusaurus/useBaseUrl';
import SvgIcon from '@mui/material/SvgIcon';

const ArrowIcon = () => (
  <SvgIcon sx={{ fontSize: '24px', ml: 1 }}>
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M10.166 9.88298V10.55H11.5V9.88298V5.16702C11.5 4.79863 11.2014 4.5 10.833 4.5H6.11703H5.45002V5.83403H6.11703H9.22266L4.97165 10.085L4.5 10.5567L5.4433 11.5L5.91496 11.0283L10.166 6.77732V9.88298Z" 
      fill="currentColor" 
      fillOpacity="0.6"
    />
  </SvgIcon>
);

export default function Footer() {
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
  const padding = isDesktop ? 8 : 5;
  const logoUrl = useBaseUrl('img/logo.svg');
  const copyright = `© ${new Date().getFullYear()} Noders LLC`;

  return (
    <Container maxWidth="lg" disableGutters>
      <Box
        pt={isDesktop ? 10 : 5}
        pb={3}
        px={padding}
        borderTop={1}
        borderLeft={1}
        borderRight={1}
        borderColor="divider"
      >

        <Grid
          container
          spacing={padding}
          justifyContent="space-between"
          sx={{width: '100%'}}
        >
          <Grid
            size={{xs: 12, lg: 4}}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {xs: 'center', lg: 'flex-start'}
            }}>
            <Typography variant="h6" sx={{pb: 1}}>
              Validator services
            </Typography>
            <Typography variant="body2" sx={{opacity: 0.6, fontWeight: 300}}>
              Infrastructure and services for mainnets and testnets: Public RPC, API, Snapshots, Guides
            </Typography>
            <Box
              component="a"
              href='https://noders.team'
              target="_blank"
              display="flex"
              border={1}
              borderColor="divider"
              borderRadius={2}
              mt={2}
              p={1}
              width="fit-content"
              sx={{
                "&:hover": {
                  textDecoration: 'none',
                  backgroundColor: 'background.paper',
                }
              }}
            >
              <Box
                component="img"
                src={logoUrl}
                alt="NODERS"
                sx={{
                  alignSelf: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  mr: 2,
                  cursor: 'pointer',
                }}
              />
              <Box>
                <Typography variant="caption" sx={{color: 'text.primary', textDecoration: 'none', opacity: 0.6}}>
                  Created by
                </Typography>
                <Typography variant="body2">
                  Noders.team
                </Typography>
              </Box>
              <Box display="flex" alignItems="top" ml={3}
                   sx={{color: 'text.primary', fontSize: '0.7rem', opacity: 0.6}}>
                <ArrowIcon />
              </Box>
            </Box>
          </Grid>

          <Grid size={{xs: 6, md: 4, lg: 2}}>
            <Typography variant="overline" sx={{opacity: 0.3}}>
              Our products
            </Typography>
            <Stack spacing={2} pt={2}>
              <Link href="https://celestiahub.org/explorer/dashboard" target="_blank" sx={{color: 'inherit', opacity: 0.6, display: 'flex'}}>
                <Typography variant="body2">
                  Explorer
                </Typography>
                <ArrowIcon />
              </Link>
              <Link href="https://celestiahub.org" target="_blank" sx={{color: 'inherit', opacity: 0.6, display: 'flex'}}>
                <Typography variant="body2">
                  CommunityApp
                </Typography>
                <ArrowIcon />
              </Link>
              <Link href="https://faucet.noders.services" target="_blank" sx={{color: 'inherit', opacity: 0.6, display: 'flex'}}>
                <Typography variant="body2">
                  Faucet
                </Typography>
                <ArrowIcon />
              </Link>
            </Stack>
          </Grid>

          <Grid size={{xs: 6, md: 4, lg: 2}}>
            <Typography variant="overline" sx={{opacity: 0.3}}>
              Company
            </Typography>
            <Stack spacing={2} pt={2}>
              <Link href="https://noders.team" target="_blank" sx={{color: 'inherit', opacity: 0.6, display: 'flex'}}>
                <Typography variant="body2">
                  About Us
                </Typography>
                <ArrowIcon />
              </Link>
              <Link href="https://noders.team" target="_blank" sx={{color: 'inherit', opacity: 0.6, display: 'flex'}}>
                <Typography variant="body2">
                  Stake with Us
                </Typography>
                <ArrowIcon />
              </Link>
              <Link href="mailto:office@noders.team" sx={{color: 'inherit', opacity: 0.6, display: 'flex'}}>
                <Typography variant="body2">
                  Contact Us
                </Typography>
              </Link>
            </Stack>
          </Grid>

          <Grid size={{xs: 6, md: 4, lg: 3}}>
            <Typography variant="overline" sx={{opacity: 0.3}}>
              Socials
            </Typography>
            <Stack direction="row" pt={2} spacing={3}>
              <Link href="https://x.com/NODERS_TEAM" target="_blank" aria-label="Twitter" sx={{color: 'inherit', opacity: 0.6}}>
                <FaXTwitter size={24}/>
              </Link>
              <Link href="https://t.me/noders_team" target="_blank" aria-label="Telegram Channel"
                    sx={{color: 'inherit', opacity: 0.6}}>
                <FaTelegram size={24}/>
              </Link>
              <Link href="https://github.com/noders-team" target="_blank" aria-label="GitHub" sx={{color: 'inherit', opacity: 0.6}}>
                <FaGithub size={24}/>
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box pt={6} sx={{textAlign: {xs: 'center', lg: 'left'}}}>
          <Typography variant="caption" sx={{opacity: 0.3}}>
            {copyright}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
