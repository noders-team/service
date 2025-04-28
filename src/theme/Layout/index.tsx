import React, { type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import MuiThemeProvider from "@/components/MuiThemeProvider";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper({children, ...props}): ReactNode {
  return (
    <>
      <Layout {...props}>
        <InitColorSchemeScript/>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </Layout>
    </>
  );
}
