'use client';

import React, { useEffect } from 'react';
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
            // main: '#3880FF', 
            main: 'FFFFFF',
          },
          secondary: {
            // main: '#25c2a0', 
            main: '#FFFFFF',
          },
          background: {
            default: colorMode === 'dark' ? '#04060B' : '#ffffff',
            paper: colorMode === 'dark' ? '#20222C' : '#f6f8fa',
          },
        },
      }),
    [colorMode],
  );

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--ifm-color-primary', theme.palette.primary.main);
    root.style.setProperty('--ifm-color-primary-dark', theme.palette.primary.dark);
    root.style.setProperty('--ifm-color-primary-darker', theme.palette.primary.dark);
    root.style.setProperty('--ifm-color-primary-darkest', theme.palette.primary.dark);
    root.style.setProperty('--ifm-color-primary-light', theme.palette.primary.light);
    root.style.setProperty('--ifm-color-primary-lighter', theme.palette.primary.light);
    root.style.setProperty('--ifm-color-primary-lightest', theme.palette.primary.light);
    
    root.style.setProperty('--ifm-menu-color-active', theme.palette.primary.main);
    root.style.setProperty('--ifm-menu-color-primary', theme.palette.primary.main);
    root.style.setProperty('--ifm-link-color', theme.palette.primary.main);
    root.style.setProperty('--ifm-navbar-link-hover-color', theme.palette.primary.main);
    root.style.setProperty('--ifm-toc-link-active-color', theme.palette.primary.main);
    root.style.setProperty('--ifm-breadcrumb-color-active', theme.palette.primary.main);
    root.style.setProperty('--ifm-tabs-color-active', theme.palette.primary.main);
    root.style.setProperty('--ifm-tabs-color-active-border', theme.palette.primary.main);

    root.style.setProperty('--ifm-code-background', theme.palette.background.paper);
    root.style.setProperty('--ifm-code-font-size', '95%');
    
    if (colorMode === 'dark') {
      root.style.setProperty('--ifm-background-color', theme.palette.background.default);
      root.style.setProperty('--ifm-background-surface-color', theme.palette.background.default);
      root.style.setProperty('--ifm-toc-link-color', theme.palette.text.secondary);
      root.style.setProperty('--ifm-table-border-color', theme.palette.background.paper);
      root.style.setProperty('--docusaurus-highlighted-code-line-bg', 'rgba(0, 0, 0, 0.3)');
    } else {
      root.style.setProperty('--ifm-table-border-color', theme.palette.divider);
      root.style.setProperty('--docusaurus-highlighted-code-line-bg', 'rgba(0, 0, 0, 0.1)');
    }
  }, [theme, colorMode]);

  return (
    <CacheProvider value={emotionCache}>
      <MUIThemeProvider theme={theme}>
        <Root {...props} />
      </MUIThemeProvider>
    </CacheProvider>
  );
} 