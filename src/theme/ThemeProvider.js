'use client';

import React from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import Root from '@theme-original/Root';

const createEmotionCache = () => {
  return createCache({ key: 'mui' });
};

const emotionCache = createEmotionCache();

export default function ThemeProvider(props) {
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
          primary: {
            main: '#3578e5', 
          },
          secondary: {
            main: '#25c2a0', 
          },
        },
      }),
    [colorMode],
  );

  return (
    <CacheProvider value={emotionCache}>
      <MUIThemeProvider theme={theme}>
        <Root {...props} />
      </MUIThemeProvider>
    </CacheProvider>
  );
} 