import { Link as MuiLink, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import ChainCard from "../ChainCard";
import { Chain } from "@/types/Chain";
import DocusaurusLink from "@docusaurus/Link";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={4}>{children}</Box>}
    </div>
  );
}

async function fetchChains(url: string): Promise<Chain[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch chains data');
  }
  return response.json();
}

function ChainsGrid() {
  const [mainnetChains, setMainnetChains] = React.useState<Chain[]>([]);
  const [testnetChains, setTestnetChains] = React.useState<Chain[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const chainsUrl = 'chains.json';
  React.useEffect(() => {
    fetchChains(chainsUrl)
      .then(data => {
        setMainnetChains(data.filter(chain => chain.scope === 'mainnet'));
        setTestnetChains(data.filter(chain => chain.scope === 'testnet'));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chains:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const mainnetContent = useMemo(() => (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
      {mainnetChains.map((chain) => (
        <MuiLink component={DocusaurusLink} to={`mainnet-networks/${chain.name}`} key={chain.chain_id} sx={{
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
            color: 'inherit'
          },
          color: 'inherit'
        }}>
          <ChainCard
            chainName={chain.pretty_name}
            chainId={chain.chain_id}
            iconUrl={chain.logo_url}
          />
        </MuiLink>
      ))}
    </Box>
  ), [mainnetChains]);

  const testnetContent = useMemo(() => (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
      {testnetChains.map((chain) => (
        <MuiLink component={DocusaurusLink} to={`testnet-networks/${chain.name}`} key={chain.chain_id} sx={{
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
            color: 'inherit'
          },
          color: 'inherit'
        }}>
          <ChainCard
            chainName={chain.pretty_name}
            chainId={chain.chain_id}
            iconUrl={chain.logo_url}
          />
        </MuiLink>
      ))}
    </Box>
  ), [testnetChains]);

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

export default ChainsGrid
