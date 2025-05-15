import React, { useEffect } from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// import { useColorMode } from '@docusaurus/theme-common';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';

const createEmotionCache = () => {
  return createCache({ key: 'mui' });
};

const emotionCache = createEmotionCache();

export default function MuiThemeProvider(props) {
  //const { colorMode } = useColorMode();
  const colorMode = 'dark';
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
      success: {
        main: '#09C37C',
      },
      warning: {
        main: '#FF9807',
      },
      divider: '#1F232E',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '48px',
        fontWeight: 500,
        lineHeight: '56px',
        letterSpacing: '-1.5px',
        fontFamily: '"Space Grotesk", sans-serif',
        marginBottom: '0px!important',
      },
      h2: {
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: '38px',
        letterSpacing: '-0.5px',
        fontFamily: '"Space Grotesk", sans-serif',
      },
      h3: {
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '28px',
        letterSpacing: '0px',
        fontFamily: '"Space Grotesk", sans-serif',
      },
      h4: {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '0.25px',
        fontFamily: '"Space Grotesk", sans-serif',
      },
      h5: {
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '24px',
        letterSpacing: '0px',
        fontFamily: '"Space Grotesk", sans-serif',
      },
      h6: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '24px',
        letterSpacing: '0.15px',
        fontFamily: '"Space Grotesk", sans-serif',
      },
      subtitle1: { fontSize: '18px', fontWeight: 400, lineHeight: '175%', letterSpacing: '0.15px' },
      subtitle2: { fontSize: '14px', fontWeight: 500, lineHeight: '157%', letterSpacing: '0.1px' },
      body1: { fontSize: '16px', fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' },
      body2: { fontSize: '14px', fontWeight: 400, lineHeight: '143%', letterSpacing: '0.17px' },
      button: { fontSize: '16px', fontWeight: 500, lineHeight: '150%', letterSpacing: '1px', textTransform: 'none' },
      caption: { fontSize: '12px', fontWeight: 400, lineHeight: '165%', letterSpacing: '0.4px' },
      overline: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '150%',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        opacity: 0.6,
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
          sizeMedium: {
            fontSize: '14px',
            lineHeight: '21px',
            fontWeight: 500,
            letterSpacing: '1px',
            padding: '12px 24px',
          },
          sizeLarge: {
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
            borderRadius: 8,
            padding: '12px 24px',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
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
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: '#04060B',
          },
        },
      },
    },
  };

  const light: ThemeOptions = {};

  const palette = isDark ? dark : light;
  const theme = React.useMemo(() => createTheme(palette), [colorMode]);

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

    root.style.setProperty('--ifm-toc-border-color', theme.palette.divider);

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
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CacheProvider>
  );
}
