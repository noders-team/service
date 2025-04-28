import React, { type ReactNode } from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type { WrapperProps } from '@docusaurus/types';
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import MuiThemeProvider from "@/components/MuiThemeProvider"

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): ReactNode {
  return (
    <>
      <InitColorSchemeScript/>
      <MuiThemeProvider>
        <Navbar {...props} />
      </MuiThemeProvider>
    </>
  );
}
