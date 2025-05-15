import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Home from './Home';
import Footer from '@/components/Footer';

export default function RootPage(): React.JSX.Element {
  return (
    <Layout>
      <Head>
        {/* meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://noders.services/img/open-graph/home.png" />
        <meta property="og:url" content="https://noders.services" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4PD80V2K10"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4PD80V2K10');
          `}
        </script>
      </Head>
      <div
        style={{
          backgroundImage: 'url(img/home-page/dot-pattern.svg)',
        }}
      >
        <Home />
        <Footer />
      </div>
    </Layout>
  );
}
