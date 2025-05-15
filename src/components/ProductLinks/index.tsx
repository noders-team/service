import React from 'react';
import Box from '@mui/material/Box';
import SimpleCard from '@/components/SimpleCard';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Typography from '@mui/material/Typography';
import { PiArrowUpRightBold } from 'react-icons/pi';

type Props = {
  appUrl?: string;
  appImageUrl?: string;
  explorerUrl?: string;
  explorerImageUrl?: string;
  faucetUrl?: string;
};

function ProductLinks({ appUrl, appImageUrl, explorerUrl, explorerImageUrl, faucetUrl }: Props): React.JSX.Element {
  if (!explorerUrl && !faucetUrl && !appUrl) {
    return null;
  }

  const baseAppImageUrl = useBaseUrl(appImageUrl);
  const baseExpImageUrl = useBaseUrl(explorerImageUrl);
  const faucetImageUrl = useBaseUrl('/img/products/faucet.webp');

  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };

  const typographyStyle = {
    cursor: 'inherit',
    '&:hover': {
      cursor: 'inherit',
    },
  };

  const activeLinksCount = [appUrl, explorerUrl, faucetUrl].filter(Boolean).length;
  const gridColumns = activeLinksCount === 3 ? 2 : activeLinksCount;

  return (
    <Box
      display="grid"
      gap={2}
      borderRadius={2}
      sx={{
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: `repeat(${gridColumns}, 1fr)`,
        },
      }}
    >
      {appUrl && (
        <SimpleCard gap={3} alignItems="center" paddingRight={3} onClick={() => handleClick(appUrl)} cursor="pointer">
          <Box component="img" src={baseAppImageUrl} alt="Community App" width={120} height={120} />
          <Box display="flex" flexDirection="column" gap={1} flexGrow={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={typographyStyle}>
                CommunityApp
              </Typography>
              <PiArrowUpRightBold size={24} opacity={0.2} />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.5, ...typographyStyle }}>
              One-stop portal for end-users, developers and researchers
            </Typography>
          </Box>
        </SimpleCard>
      )}
      {explorerUrl && (
        <SimpleCard
          gap={3}
          alignItems="center"
          paddingRight={3}
          onClick={() => handleClick(explorerUrl)}
          cursor="pointer"
        >
          <Box component="img" src={baseExpImageUrl} alt="Explorer" width={120} height={120} />
          <Box display="flex" flexDirection="column" gap={1} flexGrow={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={typographyStyle}>
                Explorer
              </Typography>
              <PiArrowUpRightBold size={24} opacity={0.2} />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.5, ...typographyStyle }}>
              A powerful and user-friendly analytics tool
            </Typography>
          </Box>
        </SimpleCard>
      )}
      {faucetUrl && (
        <SimpleCard
          gap={3}
          alignItems="center"
          paddingRight={3}
          onClick={() => handleClick(faucetUrl)}
          cursor="pointer"
        >
          <Box component="img" src={faucetImageUrl} alt="Faucet" width={120} height={120} />
          <Box display="flex" flexDirection="column" gap={1} flexGrow={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={typographyStyle}>
                Faucet
              </Typography>
              <PiArrowUpRightBold size={24} opacity={0.2} />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.5, ...typographyStyle }}>
              Claim testnet tokens for testing and build on the network
            </Typography>
          </Box>
        </SimpleCard>
      )}
    </Box>
  );
}

export default ProductLinks;
