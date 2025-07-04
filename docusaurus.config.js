// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from 'prism-react-renderer';

const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Validator Services | NODERS',
  tagline: 'Trusted blockchain validator and web3 developer team',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://noders.services',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || '/',

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

  stylesheets: ['https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'],

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
      `,
    },
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
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/mainnet-networks',
            to: '/mainnet/overview',
          },
          {
            from: '/mainnet',
            to: '/mainnet/overview',
          },
          {
            from: '/testnet-networks',
            to: '/testnet/overview',
          },
          {
            from: '/testnet',
            to: '/testnet/overview',
          },
        ],
        createRedirects(existingPath) {
          const redirects = [];
          if (existingPath.includes('/mainnet/')) {
            const oldPath = existingPath.replace('/mainnet/', '/mainnet-networks/');
            redirects.push(oldPath);
          }
          if (existingPath.includes('/testnet/')) {
            const oldPath = existingPath.replace('/testnet/', '/testnet-networks/');
            redirects.push(oldPath);
          }
          return redirects.length > 0 ? redirects : undefined;
        },
      },
    ],
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
    },
    ...(process.env.BASE_URL && process.env.BASE_URL !== '/'
      ? []
      : [
          [
            '@acid-info/docusaurus-og',
            {
              path: './preview-images',
              imageRenderers: {
                'docusaurus-plugin-content-pages': require('./lib/open-graph/ImageRenderers').default.pages,
                'docusaurus-plugin-content-docs': require('./lib/open-graph/ImageRenderers').default.docs,
              },
            },
          ],
        ]),
  ],
};

module.exports = config;
