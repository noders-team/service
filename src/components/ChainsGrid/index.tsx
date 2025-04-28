import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import ChainCard from "../ChainCard";
import { Chain } from "../../types/Chain";
import Link from "@docusaurus/Link";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  const [chains, setChains] = React.useState<Chain[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const chainsUrl = 'chains.json';
  React.useEffect(() => {
    fetchChains(chainsUrl)
      .then(data => {
        setChains(data);
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

  const mainnetChains = chains.filter(chain => chain.scope === 'mainnet')
  const testnetChains = chains.filter(chain => chain.scope === 'testnet')

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
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
          {mainnetChains.map((chain) => (
            <Link to={`mainnet-networks/${chain.name}`} key={chain.chain_id}>
              <ChainCard
                key={chain.chain_id}
                chainName={chain.pretty_name}
                chainId={chain.chain_id}
                iconUrl={chain.logo_url}
              />
            </Link>
          ))}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
          {testnetChains.map((chain) => (
            <Link to={`testnet-networks/${chain.name}`} key={chain.chain_id}>
              <ChainCard
                key={chain.chain_id}
                chainName={chain.pretty_name}
                chainId={chain.chain_id}
                iconUrl={chain.logo_url}
              />
            </Link>
          ))}
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default ChainsGrid
