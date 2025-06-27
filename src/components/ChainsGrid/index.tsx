import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useMemo } from 'react';
import ChainCard from '../ChainCard';
import { Chain } from '@/types/Chain';
import DocusaurusLink from '@docusaurus/Link';
import chainService from '@/service/chainService';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box pt={4}>{children}</Box>}
    </div>
  );
}

function ChainsGrid() {
  const [mainnetChains, setMainnetChains] = React.useState<Chain[]>([]);
  const [testnetChains, setTestnetChains] = React.useState<Chain[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const chainsUrl = useBaseUrl('chains.json');

  React.useEffect(() => {
    Promise.all([chainService.getMainnetChains(chainsUrl), chainService.getTestnetChains(chainsUrl)])
      .then(([mainnet, testnet]) => {
        setMainnetChains(mainnet);
        setTestnetChains(testnet);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chains:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const mainnetContent = useMemo(
    () => (
      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {mainnetChains.map((chain) => (
          <Link
            component={DocusaurusLink}
            to={`mainnet/${chain.name}`}
            key={chain.chain_id}
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
                color: 'inherit',
              },
              color: 'inherit',
            }}
          >
            <ChainCard chainName={chain.pretty_name} chainId={chain.chain_id} iconUrl={chain.logo_url} />
          </Link>
        ))}
      </Box>
    ),
    [mainnetChains]
  );

  const testnetContent = useMemo(
    () => (
      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {testnetChains.map((chain) => (
          <Link
            component={DocusaurusLink}
            to={`testnet/${chain.name}`}
            key={chain.chain_id}
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
                color: 'inherit',
              },
              color: 'inherit',
            }}
          >
            <ChainCard chainName={chain.pretty_name} chainId={chain.chain_id} iconUrl={chain.logo_url} />
          </Link>
        ))}
      </Box>
    ),
    [testnetChains]
  );

  if (loading) {
    return <Box>Loading chains...</Box>;
  }

  return (
    <Box display="flex" flexGrow={1} flexDirection="column">
      <Box display="flex" flexGrow={1} borderBottom={1} borderColor="divider">
        <Tabs variant="fullWidth" value={value} onChange={handleChange} sx={{ display: 'flex', flexGrow: 1 }}>
          <Tab label="Mainnet" sx={{ flexGrow: 1 }} />
          <Tab label="Testnet" sx={{ flexGrow: 1 }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {mainnetContent}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {testnetContent}
      </CustomTabPanel>
    </Box>
  );
}

export default ChainsGrid;
