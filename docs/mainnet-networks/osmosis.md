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

# Osmosis: A Groundbreaking DEX Protocol

Osmosis is a groundbreaking decentralized exchange (DEX) protocol that pioneers the concept of customizable liquidity pools, enabling users to control the parameters of their liquidity pools for optimized trading strategies. As the first IBC-native Cosmos DEX, Osmosis facilitates seamless cross-chain transactions, fostering a more interconnected and interoperable blockchain ecosystem.

## Key Features

### Advanced Liquidity Pools

Osmosis allows users to **create and customize their liquidity pools**, adjusting parameters such as swap fees, slippage, and rewards. This level of customization is designed to optimize liquidity provision and trading strategies, catering to the unique needs of different tokens and trading pairs.

### Cross-Chain Interoperability

Built on the Cosmos SDK and utilizing the Inter-Blockchain Communication (IBC) protocol, Osmosis enables secure and efficient cross-chain swaps, allowing assets to flow freely across the Cosmos ecosystem and beyond. This interoperability expands the available market for traders and liquidity providers, connecting previously isolated blockchain networks.

### Decentralized Governance

Osmosis is governed by its community of token holders, who have the power to propose and vote on changes to the protocol. This decentralized governance model ensures that the platform evolves in alignment with the interests and needs of its users.

### Superfluid Staking

Osmosis introduces the innovative concept of **superfluid staking**, which allows liquidity providers to simultaneously earn trading fees and staking rewards, maximizing the capital efficiency for users who contribute to the protocol's security and liquidity.

### Enhanced User Experience

Despite its advanced features, Osmosis offers an intuitive and user-friendly interface, making it accessible to both novice and experienced traders. The platform emphasizes simplicity and ease of use, ensuring that users can easily navigate and utilize its features.

### Community and Ecosystem Growth

Osmosis places a strong emphasis on community engagement and ecosystem development. The project actively supports the growth of the Cosmos ecosystem by integrating with new chains, fostering collaboration, and funding initiatives that drive adoption and innovation.

## Mission

Osmosis is on a mission to revolutionize decentralized finance by offering a highly customizable, interoperable, and user-centric trading platform. It aims to empower users with the tools they need to tailor their trading and liquidity provision strategies, all while contributing to the broader vision of a more interconnected and efficient blockchain ecosystem.


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
