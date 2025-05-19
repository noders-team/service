import React, { ReactElement } from 'react';
import type { DocsPageData, ImageRenderer } from '@acid-info/docusaurus-og';
import { readFileSync } from 'fs';
import { join } from 'path';

//
// PAGES
//
const pages: ImageRenderer<DocsPageData> = (data: DocsPageData, context) => {
  const backgroundImagePath = join(__dirname, '../../static/img/open-graph/home.png');
  const backgroundImageData = readFileSync(backgroundImagePath);
  const backgroundImageBase64 = `data:image/png;base64,${backgroundImageData.toString('base64')}`;

  return [
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImageBase64})`,
      }}
    ></div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'SpaceGrotesk',
          data: readFileSync(join(__dirname, '../../static/fonts/SpaceGrotesk/SpaceGrotesk-SemiBold.ttf')),
          weight: 600,
          style: 'normal',
        },
      ],
    },
  ];
};

type DocProps = {
  chain_name: string;
  chain_id: string;
  icon_url: string;
  scope: string;
  binary_version: string;
};

//
// DOCS
//
const docs: ImageRenderer<DocsPageData> = (data: DocsPageData, context) => {
  const permaLink = data.metadata.permalink;
  let layout: ReactElement;

  //
  // OVERVIEW PAGES
  //
  if (permaLink === '/mainnet-networks/overview' || permaLink === '/testnet-networks/overview') {
    const imageUrl = permaLink.includes('mainnet')
      ? `img/open-graph/overview-mainnet.png`
      : `img/open-graph/overview-testnet.png`;
    const backgroundImagePath = join(__dirname, `../../static/${imageUrl}`);
    const backgroundImageData = readFileSync(backgroundImagePath);
    const backgroundImageBase64 = `data:image/png;base64,${backgroundImageData.toString('base64')}`;
    layout = (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImageBase64})`,
        }}
      ></div>
    );
  } else {
    //
    // NETWORK PAGE
    //
    const frontMatter = data.metadata.frontMatter as DocProps;

    const chainName = frontMatter.chain_name;
    const chainId = frontMatter.chain_id;

    const backgroundImagePath = join(__dirname, '../../static/img/open-graph/background.png');
    const backgroundImageData = readFileSync(backgroundImagePath);
    const backgroundImageBase64 = `data:image/png;base64,${backgroundImageData.toString('base64')}`;

    let iconName = 'testnet-icon.png';
    if (frontMatter.icon_url && !frontMatter.icon_url.includes('[CHAIN_ICON]')) {
      iconName = frontMatter.icon_url.replace('.svg', '.png');
    }
    const iconPath = join(__dirname, `../../static/img/png-icon/${iconName}`);
    const iconData = readFileSync(iconPath);
    const iconBase64 = `data:image/png;base64,${iconData.toString('base64')}`;

    let chipImgName = 'chip-testnet.png';
    if (frontMatter.scope && frontMatter.scope !== '[CHAIN_SCOPE]') {
      chipImgName = `chip-${frontMatter.scope}.png`;
    }
    const chipImgData = readFileSync(join(__dirname, `../../static/img/open-graph/${chipImgName}`));
    const chipImgBase64 = `data:image/png;base64,${chipImgData.toString('base64')}`;

    layout = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '64px',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          color: 'white',
          backgroundImage: `url(${backgroundImageBase64})`,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '120px',
              height: '120px',
              backgroundImage: `url(${iconBase64})`,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: '80px',
            }}
          >
            {chainName}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '34px',
            }}
          >
            {chainId}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '34px',
              opacity: 0.2,
            }}
          >
            |
          </div>
          <div
            style={{
              display: 'flex',
              width: '135px',
              height: '40px',
              backgroundImage: `url(${chipImgBase64})`,
            }}
          />
        </div>
      </div>
    );
  }

  return [
    layout,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'SpaceGrotesk',
          data: readFileSync(join(__dirname, '../../static/fonts/SpaceGrotesk/SpaceGrotesk-SemiBold.ttf')),
          weight: 600,
          style: 'normal',
        },
      ],
    },
  ];
};

export default { pages, docs };
