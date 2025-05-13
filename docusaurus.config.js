// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from 'prism-react-renderer';

const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VALIDATOR SERVICES | NODERS',
  tagline: 'Trusted blockchain validator and web3 developer team',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://noders.services',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/service/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'noders-team', // Usually your GitHub org/user name.
  projectName: 'service', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // future: { experimental_faster: true },

  stylesheets: [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
  ],

  headTags: [
    {
      tagName: 'style',
      attributes: { type: 'text/css' },
      innerHTML: `
        [data-theme='dark'] {
          --ifm-background-color: #04060B!important;
          --ifm-background-surface-color: #04060B!important;
          --ifm-navbar-background-color: #04060B!important;
        }

        @font-face {
          font-family: 'Consolas';
          src: local('Consolas');
          font-display: swap;
        }
      `
    }
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.svg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Noders.Services',
        logo: {
          alt: '[NODERS]TEAM',
          src: 'img/logo.svg',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'custom-navbar-item-links',
            position: 'left',
          },
          {
            type: 'custom-navbar-item-social-links',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash'],
      },
      footer: {},
    }),

  plugins: [
    function aliasPlugin(context, options) {
      return {
        name: 'docusaurus-plugin-aliases',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@': path.resolve(__dirname, './src'),
              },
            },
          };
        },
      };
    }
  ],
};

module.exports = config;
