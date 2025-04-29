import React from 'react';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useThemeConfig } from '@docusaurus/theme-common';
import { FaGithub, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MuiThemeProvider from '@site/src/components/MuiThemeProvider'

export default function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }

  const { copyright } = footer;
  const logoUrl = useBaseUrl('img/logo.svg');

  return (
    <MuiThemeProvider>
      <Container
        component="footer"
        maxWidth="lg"
        disableGutters
      >
        <Box
          pt={10}
          pb={3}
          px={8}
          borderTop={1}
          borderLeft={1}
          borderRight={1}
          borderColor="divider"
        >
          <Grid
            container
            spacing={8}
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ pb: 2 }}>
                Validator services
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                Infrastructure and services for mainnets and testnets: Public RPC, API, Snapshots, Guides
              </Typography>

              <Box
                component="a"
                href='https://noders.team'
                display="flex"
                border={1}
                borderColor="divider"
                borderRadius={2}
                mt={3}
                p={1}
                width="fit-content"
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
                  <Typography variant="caption" sx={{ color: 'text.primary', textDecoration: 'none', opacity: 0.6 }}>
                    Created by
                  </Typography>
                  <Link href="https://noders.team">
                    <Typography variant="body2">
                      Noders.team
                    </Typography>
                  </Link>
                </Box>
                <Box display="flex" alignItems="top" ml={3} sx={{ color: 'text.primary', fontSize: '0.7rem', opacity: 0.6 }}>↗</Box>
              </Box>

            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Typography variant="overline" sx={{ opacity: 0.3 }}>
                Our products
              </Typography>
              <Stack spacing={2} pt={2}>
                <Link href="https://celestiahub.org/explorer/dashboard"
                  sx={{ color: 'inherit', opacity: 0.6, display: 'flex' }}>
                  <Typography variant="body2">
                    Explorer
                  </Typography>
                  <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
                </Link>
                <Link href="https://celestiahub.org" sx={{ color: 'inherit', opacity: 0.6, display: 'flex' }}>
                  <Typography variant="body2">
                    CommunityApp
                  </Typography>
                  <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
                </Link>
                <Link href="https://faucet.noders.services" sx={{ color: 'inherit', opacity: 0.6, display: 'flex' }}>
                  <Typography variant="body2">
                    Faucet
                  </Typography>
                  <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Typography variant="overline" sx={{ opacity: 0.3 }}>
                Company
              </Typography>
              <Stack spacing={2} pt={2}>
                <Link href="https://noders.team" sx={{ color: 'inherit', opacity: 0.6, display: 'flex' }}>
                  <Typography variant="body2">
                    About Us
                  </Typography>
                  <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
                </Link>
                <Link href="https://noders.team" sx={{ color: 'inherit', opacity: 0.6, display: 'flex' }}>
                  <Typography variant="body2">
                    Stake with Us
                  </Typography>
                  <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
                </Link>
                <Link href="mailto:office@noders.team" sx={{ color: 'inherit', opacity: 0.6, display: 'flex' }}>
                  <Typography variant="body2">
                    Contact Us
                  </Typography>
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="overline" sx={{ opacity: 0.3 }}>
                Socials
              </Typography>
              <Stack direction="row" pt={2} spacing={3}>
                <Link href="https://x.com/NODERS_TEAM" aria-label="Twitter" sx={{ color: 'inherit', opacity: 0.6 }}>
                  <FaXTwitter size={24} />
                </Link>
                <Link href="https://t.me/noders_team" aria-label="Telegram Channel"
                  sx={{ color: 'inherit', opacity: 0.6 }}>
                  <FaTelegram size={24} />
                </Link>
                <Link href="https://github.com/noders-team" aria-label="GitHub" sx={{ color: 'inherit', opacity: 0.6 }}>
                  <FaGithub size={24} />
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <Box pt={6}>
            <Typography variant="caption" sx={{ opacity: 0.3 }}>
              {copyright}
            </Typography>
          </Box>
        </Box>
      </Container>
    </MuiThemeProvider>
  );
}
