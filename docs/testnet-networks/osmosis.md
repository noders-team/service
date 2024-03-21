---
hide_table_of_contents: false
title: template
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-osmosis">
# Osmosis
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

Osmosis is a cutting-edge decentralized exchange (DEX) and automated market maker (AMM) protocol built on the Cosmos network. It stands out for its advanced features that cater to liquidity providers and traders alike, aiming to revolutionize the DeFi space with its unique approach to liquidity pools and trading.

Key Features:

Interchain Exchange: Osmosis harnesses the power of the Inter-Blockchain Communication (IBC) protocol, enabling seamless swaps and liquidity provision across various blockchain networks. This interconnectivity fosters a more unified and expansive DeFi ecosystem.

Customizable Pools: Unlike traditional AMMs, Osmosis allows users to create liquidity pools with customizable parameters, such as swap fees and bonding curves. This flexibility empowers liquidity providers to tailor pools according to their strategies and market views.

Superfluid Staking: A novel feature that enables liquidity providers to simultaneously earn staking rewards and trading fees. This mechanism enhances capital efficiency and incentivizes participation in the network's security.

Governance and Community-Driven: Osmosis is governed by its token holders, ensuring that the protocol evolves in alignment with the community's interests. Token holders can propose and vote on changes to the protocol, including upgrades and parameter adjustments.

Enhanced User Experience: The platform prioritizes a smooth and intuitive user interface, making it accessible for both seasoned DeFi enthusiasts and newcomers. This focus on user experience is aimed at driving broader adoption of decentralized finance.

Osmosis is not just a DEX; it's a comprehensive DeFi ecosystem that leverages the Cosmos network's capabilities to offer a decentralized, secure, and interoperable trading platform. With its innovative features and community-driven approach, Osmosis is poised to play a pivotal role in the future of decentralized finance.

## Public endpoints 

<CardLayout autoFitEnabled={true}>
    <SmallCard to="https://osmosis.rpc.mainnet.noders.team" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://osmosis.api.mainnet.noders.team" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://osmosis.grpc.mainnet.noders.team" header={{label: "gRPC-Web Endpoint", translateId: "grpcweb-endpoint"}}/>
</CardLayout>

## Our validator

<CardLayout autoFitEnabled={true}>
    <Card
        to="#"
        header={{
            label: "[NODERS]TEAM",
            translateId: "development-setup",
        }}
        body={{
            label: "Trusted blockchain validator",
            translateId: "development-setup-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

## Social resources
See the API for the various client libraries implemented for.

<CardLayout autoFitEnabled={false}>
    <SmallCard to="#" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/osmosis-labs/osmosis" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="#" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="#" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/osmosiszone" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>
