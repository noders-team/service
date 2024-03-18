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

Osmosis is a decentralized peer-to-peer blockchain that people can use to create liquidity and trade IBC enabled tokens. The Osmosis blockchain is made up of free, public, and open-source software.

## Public endpoints 

<CardLayout autoFitEnabled={true}>
    <SmallCard to="https://osmosis.rpc.mainnet.noders.team" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://osmosis.api.mainnet.noders.team" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://osmosis.grpc.mainnet.noders.team" header={{label: "gRPC-Web Endpoint", translateId: "grpcweb-endpoint"}}/>
</CardLayout>

## We are

<CardLayout autoFitEnabled={true}>
    <Card
        to="#"
        header={{
            label: "Stake with us",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn about the React Native SDKs and how to quickly start building on Solana Mobile.",
            translateId: "learn-programs",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="#"
        header={{
            label: "Our validator",
            translateId: "development-setup",
        }}
        body={{
            label: "Learn how to build a native Android app using the core Solana Kotlin SDKs.",
            translateId: "development-setup-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

## Social resources
See the API for the various client libraries implemented for.

<CardLayout autoFitEnabled={false}>
    
    <SmallCard to="https://github.com/osmosis-labs/osmosis" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    
    
    <SmallCard to="https://t.me/osmosiszone" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>
