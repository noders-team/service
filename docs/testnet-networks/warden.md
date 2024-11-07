---
hide_table_of_contents: false
title: "Warden"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-warden">
# Warden
</div>
###### Chain ID: `froopyland_100-1` | Current Node Version: `v0.5.3`


Warden Protocol stands as a beacon of innovation in the decentralized finance (DeFi) landscape, focusing on bolstering security measures for blockchain transactions and smart contracts. Aimed at mitigating the risks associated with DeFi operations, Warden Protocol introduces a suite of security tools and services designed to protect users and developers from vulnerabilities, hacks, and financial losses.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://wardenprotocol.org/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/warden-protocol/wardenprotocol" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/wardenprotocol" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://x.com/wardenprotocol" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/wardenprotocol" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Warden network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://warden-explorer.paranorm.pro/warden/staking/wardenvaloper1ucm0wa7g029xvlt9yffz5kqj2zw40qyugqlakc"
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
    <SmallCard to="https://warden-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://warden-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://warden-t-grpc.noders.services:23090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>