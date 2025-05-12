import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Chain } from '@/types/Chain';
import chainService from '@/service/chainService';
import useBaseUrl from '@docusaurus/useBaseUrl';

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
  );
}

export default Overview;
