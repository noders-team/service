import React from 'react';
import { Box, Container, Typography, Link, Grid, Stack } from '@mui/material';
import { useThemeConfig } from '@docusaurus/theme-common';
import { FaTelegram, FaGithub, FaXTwitter } from 'react-icons/fa6';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }

  const { copyright } = footer;
  const logoUrl = useBaseUrl('img/logo.svg');

  return (
    <Container
      component="footer"
      maxWidth="lg"
    >
      <Box
        pt={10}
        pb={3}
        px={8}
        border={1}
        borderColor="divider"
      >
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
        >
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: 3 }}>
              Validator services
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '300px' }}>
              Infrastructure and services for mainnets and testnets: Public RPC, API, Snapshots, Guides
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={logoUrl}
                alt="Noders"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  mr: 2
                }}
              />
              <Box>
                <Typography variant="caption">
                  Created by
                </Typography>
                <Link href="https://noders.team">
                  <Typography variant="body2">
                    Noders.team
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              OUR PRODUCTS
            </Typography>
            <Stack spacing={2}>
              <Link href="https://celestiahub.org/explorer/dashboard">
                Explorer
                <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
              </Link>
              <Link href="https://celestiahub.org">
                CommunityApp
                <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
              </Link>
              <Link href="https://faucet.noders.services">
                Faucet
                <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              COMPANY
            </Typography>
            <Stack spacing={2}>
              <Link href="#" underline="none">
                About Us
                <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
              </Link>
              <Link href="#" underline="none">
                Stake with Us
                <Box component="span" sx={{ ml: 1, fontSize: '0.7rem' }}>↗</Box>
              </Link>
              <Link href="#" underline="none">
                Contact Us
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              SOCIALS
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
              <Link href="https://x.com/NODERS_TEAM" aria-label="Twitter" sx={{ color: '#ffffff' }}>
                <FaXTwitter size={24} />
              </Link>
              <Link href="https://t.me/noders_team" aria-label="Telegram Channel" sx={{ color: '#ffffff' }}>
                <FaTelegram size={24} />
              </Link>
              <Link href="https://github.com/noders-team" aria-label="GitHub" sx={{ color: '#ffffff' }}>
                <FaGithub size={24} />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ color: '#a0a0a0', mt: 4, textAlign: 'left' }}>
          {copyright}
        </Typography>
      </Box>
    </Container>
  );
}
