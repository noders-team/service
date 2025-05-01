import * as React from 'react';
import { Box, Link, Typography, SvgIcon, useMediaQuery } from "@mui/material";
import useBaseUrl from "@docusaurus/useBaseUrl";

const MainnetIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <g clipPath="url(#clip0_mainnet)">
      <rect width="11.6649" height="11.6649" rx="2" transform="matrix(0.866025 0.5 -0.866025 0.5 12.1025 -0.228271)" fill="currentColor" stroke="#03060B" strokeWidth="2"/>
      <rect width="11.6649" height="11.6649" rx="2" transform="matrix(0.866025 0.5 0 1 2 5.60376)" fill="currentColor" stroke="#03060B" strokeWidth="2"/>
      <rect width="11.6649" height="11.6649" rx="2" transform="matrix(0.866025 -0.5 0 1 12.1025 11.4368)" fill="currentColor" stroke="#03060B" strokeWidth="2"/>
    </g>
    <defs>
      <clipPath id="clip0_mainnet">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </SvgIcon>
);

const TestnetIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <mask id="mask0_testnet" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="1" y="2" width="21" height="20">
      <path d="M21.9229 2H1.92285V22H21.9229V2Z" fill="currentColor"/>
    </mask>
    <g mask="url(#mask0_169_1315)">
      <path d="M18.7747 20.7501H4.96109C3.96272 20.7501 3.36723 19.6374 3.92103 18.8068L7.62544 13.2501C7.62544 13.2501 10.7504 14.5001 12.6255 12.6251C14.5005 10.7501 16.3755 14.5001 16.3755 14.5001L19.7508 18.7193C20.4056 19.5377 19.8228 20.7501 18.7747 20.7501Z" fill="currentColor" stroke="currentColor" stroke-width="2.5"/>
      <path d="M10.1252 2.625H9.50019V3.25V9.30914L3.3416 18.4525C2.50273 19.698 3.39514 21.375 4.89673 21.375H18.9754C20.4689 21.375 21.3629 19.714 20.5404 18.4674L14.5002 9.3124V3.25V2.625H13.8752H10.1252Z" stroke="currentColor" stroke-width="1.25"/>
      <path d="M7.625 3.25H16.375" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M9.5 20.75C10.5355 20.75 11.375 19.9105 11.375 18.875C11.375 17.8395 10.5355 17 9.5 17C8.46447 17 7.625 17.8395 7.625 18.875C7.625 19.9105 8.46447 20.75 9.5 20.75Z" fill="#151522"/>
      <path d="M15.125 15.75C15.125 16.4404 14.5653 17 13.875 17C13.1846 17 12.625 16.4404 12.625 15.75C12.625 15.0596 13.1846 14.5 13.875 14.5C14.5653 14.5 15.125 15.0596 15.125 15.75Z" fill="#151522"/>
    </g>
  </SvgIcon>
);

export default function NavBarLinks(props: any): JSX.Element {
  const mainnetHref = useBaseUrl("mainnet-networks/overview");
  const testnetHref = useBaseUrl("testnet-networks/overview");
  const isMobile = props?.mobile === true;
  const isDesktop = useMediaQuery('(min-width: 997px)');

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
        <MainnetIcon sx={{ width: 24, height: 24 }} />
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
        <TestnetIcon sx={{ width: 24, height: 24 }} />
        <Typography variant="subtitle1" sx={{fontWeight: 600}}>Testnet</Typography>
      </Box>
    </Box>
  );
}
