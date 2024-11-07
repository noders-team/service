import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

export function Section({
                            children,
                            className,
                            background = 'light',
                        }) {
    const sectionClasses = clsx(styles.Section, className, background);
    return (
        <div className={sectionClasses}>
            {children}
        </div>
    );
}

function ActionButton({ href, type = 'primary', target, children }) {
    const classes = clsx(styles.ActionButton, styles[type]);
    return (
        <a className={classes} href={href} target={target}>
            {children}
        </a>
    );
}


function HomeCallToAction() {
    return (
        <>
            <ActionButton
                type="primary"
                href={useBaseUrl('mainnet-networks/overview')}
                target="_self">
                Mainnet Networks
            </ActionButton>
            <ActionButton
                type="secondary"
                href={useBaseUrl('testnet-networks/overview')}
                target="_self">
                Testnet Networks
            </ActionButton>
        </>
    );
}

function SolanaMobileStackLogo() {
    return (
        <div className={styles.logoContainer}>
            <img src="img/logo.svg" alt="[NODERS]TEAM" />
        </div>
    );
}

function HeaderHero() {
    return (
        <Section background="dark" className={styles.HeaderHero}>
            <SolanaMobileStackLogo />
            <>
                <h1 className={styles.title}>VALIDATOR SERVICES</h1>
                <p className={styles.tagline}>Professional blockchain validator and web3 developer team</p>
                <div className={styles.buttons}>
                    <HomeCallToAction />
                </div>
            </>
        </Section>
    );
}

export default function Home(): JSX.Element {
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
            <HeaderHero />
        </Layout>
    );
}
