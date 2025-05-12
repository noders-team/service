import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory } from '@docusaurus/router';
import MainnetIcon from '@site/static/img/mainnet-icon.svg';
import TestnetIcon from '@site/static/img/testnet-icon.svg';

export default function NavBarLinks(props: any): React.JSX.Element {
  const history = useHistory();
  const isMobile = props?.mobile === true;
  const isDesktop = useMediaQuery('(min-width: 997px)');
  const mainnetHref = useBaseUrl('/mainnet-networks/overview');
  const testnetHref = useBaseUrl('/testnet-networks/overview');

  if (!isMobile && !isDesktop) {
    return null;
  }

  const handleClick = (url: string) => {
    history.push(url);
  };

  return (
    <Box
      display="flex"
      pl={isDesktop ? 6 : 1}
      pb={isDesktop ? 0 : 2}
      gap={isDesktop ? 6 : 1}
      flexDirection={isDesktop ? 'row' : 'column'}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          color: 'inherit',
          opacity: 0.6,
          transition: (theme) => theme.transitions.create('all'),
          '&:hover': {
            opacity: 1,
            color: 'primary.main',
            cursor: 'pointer',
          },
        }}
        onClick={() => handleClick(mainnetHref)}
      >
        <MainnetIcon width={24} height={24} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Mainnet
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          color: 'inherit',
          opacity: 0.6,
          transition: (theme) => theme.transitions.create('all'),
          '&:hover': {
            opacity: 1,
            color: 'primary.main',
            cursor: 'pointer',
          },
        }}
        onClick={() => handleClick(testnetHref)}
      >
        <TestnetIcon width={24} height={24} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Testnet
        </Typography>
      </Box>
    </Box>
  );
}
