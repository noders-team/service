import React from 'react';
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useBaseUrl from "@docusaurus/useBaseUrl";
import MainnetIcon from "@site/static/img/mainnet-icon.svg"
import TestnetIcon from "@site/static/img/testnet-icon.svg"

export default function NavBarLinks(props: any): React.JSX.Element {
  const isMobile = props?.mobile === true;
  const isDesktop = useMediaQuery('(min-width: 997px)');
  const mainnetHref = useBaseUrl("mainnet-networks/overview");
  const testnetHref = useBaseUrl("testnet-networks/overview");

  if (!isMobile && !isDesktop) {
    return null;
  }

  return (
    <Box
      display="flex"
      pl={isDesktop ? 6 : 1}
      pb={isDesktop ? 0 : 2}
      gap={isDesktop ? 6 : 1}
      flexDirection={isDesktop ? "row" : "column"}
    >
      <Box component={Link} href={mainnetHref} display="flex" alignItems="center" gap={1}
           sx={{
             color: "text.primary",
             textDecoration: "none",
             opacity: 0.6,
             "&:hover": {
               textDecoration: "none",
               opacity: 1
             }
           }}
      >
        <MainnetIcon width={24} height={24} />
        <Typography variant="subtitle1" sx={{fontWeight: 600}}>Mainnet</Typography>
      </Box>
      <Box component={Link} href={testnetHref} display="flex" alignItems="center" gap={1}
           sx={{
             color: "text.primary",
             textDecoration: "none",
             opacity: 0.6,
             "&:hover": {
               textDecoration: "none",
               opacity: 1
             }
           }}
      >
        <TestnetIcon width={24} height={24} />
        <Typography variant="subtitle1" sx={{fontWeight: 600}}>Testnet</Typography>
      </Box>
    </Box>
  );
}
