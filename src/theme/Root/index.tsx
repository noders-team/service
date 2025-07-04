import React, { ReactNode, useEffect, useState } from 'react';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function Root({ children }: { children: ReactNode }): React.JSX.Element {
  const [isMuiReady, setIsMuiReady] = useState(false);

  useEffect(() => {
    setIsMuiReady(true);
  }, []);

  if (!isMuiReady) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: '6px solid #e0e0e0',
            borderTop: '6px solid #3880FF',
            borderRadius: '50%',
            animation: 'mui-spin 1s linear infinite',
          }}
        />
        <style>{`
          @keyframes mui-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <InitColorSchemeScript />
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </>
  );
}
