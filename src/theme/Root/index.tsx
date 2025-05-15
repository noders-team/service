import React, { ReactNode } from 'react';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function Root({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <>
      <InitColorSchemeScript />
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </>
  );
}
