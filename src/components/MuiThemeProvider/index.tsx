import React, { useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useColorMode } from '@docusaurus/theme-common';

const createEmotionCache = () => {
  return createCache({ key: 'mui' });
};

const emotionCache = createEmotionCache();

export default function ThemeProvider(props) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const dark: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#3880FF',
      },
      secondary: {
        main: '#111111',
      },
      background: {
        default: '#04060B',
        paper: '#111317',
      },
      divider: '#1F232E',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            '&:hover': {
              color: 'inherit',
            },
          },
          outlined: {
            color: '#ffffff',
            borderColor: '#ffffff',
            transition: 'all 0.15s ease',
            '&:hover': {
              color: '#3880FF',
              borderColor: '#3880FF',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          maxWidthLg: {
            maxWidth: '1400px !important',
            '@media (min-width: 1200px)': {
              maxWidth: '1400px !important',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            '&:hover': {
              opacity: 1,
            },
          },
        },
      },
    },
  }

  const light: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#3880FF',
      },
      secondary: {
        main: '#25c2a0',
      },
      background: {
        default: '#ffffff',
        paper: '#f6f8fa',
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            '&:hover': {
              color: 'inherit',
            },
          },
          outlined: {
            '&:hover': {
              color: '#3880FF',
              borderColor: '#3880FF',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          maxWidthLg: {
            maxWidth: '1400px !important',
            '@media (min-width: 1200px)': {
              maxWidth: '1400px !important',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
          },
        },
      },
    },
  }

  const palette = isDark ? dark : light;
  const theme = React.useMemo(
    () =>
      createTheme(palette),
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

  console.log('🎨 Theme: ', colorMode, theme);

  return (
    <CacheProvider value={emotionCache}>
      <MUIThemeProvider theme={theme}>
        {props.children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}
