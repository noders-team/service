---
hide_table_of_contents: false
title: "Nibiru"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-nibiru">
# Nibiru
</div>
###### Chain ID: `cataclysm-1` | Current Node Version: `v1.3.0`


Nibiru is a decentralized finance (DeFi) platform and part of the Cosmos ecosystem, designed to support the development and operation of distributed applications (dApps).

It features a smart contract framework built with Rust for improved security and performance. The platform uses a unique royalties system where developers receive a portion of the gas fees from transactions involving their smart contracts, incentivizing the creation and maintenance of dApps. Nibiru also includes innovative trading solutions like the Nibi-Perps, a decentralized exchange (DEX) for perpetual futures that allows up to 10x leverage trading, and the Nibi-Swap, an automated market maker (AMM) for spot trading​

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://nibiru.fi/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/NibiruChain" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/nibirufi" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/NibiruChain" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/nibiruchain" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Nibiru network

<CardLayout autoFitEnabled={true}>
    <Card
        to=""
        header={{
            label: "[NODERS]TEAM",
            translateId: "development-setup",
        }}
        body={{
            label: "Trusted blockchain validator",
        }}
        iconPath="img/kotlin-icon.svg"
    />
</CardLayout>

# Public endpoints 

<CardLayout autoFitEnabled={true}>
    <SmallCard to="https://nibiru-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://nibiru-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://nibiru-grpc.noders.services:35090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>


