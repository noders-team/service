import React, { ReactNode, useEffect, useState } from 'react';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function Root({ children }: { children: ReactNode }): React.JSX.Element {
  const [isMuiReady, setIsMuiReady] = useState(false);

  useEffect(() => {
    setIsMuiReady(true);
  }, []);

  if (!isMuiReady) {
    return <div>LOADING...</div>;
  }

  return (
    <>
      <InitColorSchemeScript />
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </>
  );
}
