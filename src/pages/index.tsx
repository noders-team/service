import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Home from './Home';

export default function HomePage(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Professional blockchain validator and web3 developer team">
            <Head>
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
            <Home />
        </Layout>
    );
}
