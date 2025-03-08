---
hide_table_of_contents: false
title: "Zenrock"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-zenrock">
# Zenrock
</div>
###### Chain ID: `diamond-1` | Current Node Version: `v5.16.18`


Zenrock enables decentralized key management for builders of cross-chain protocols and wallets to unlock omnichain security.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.zenrocklabs.io" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/Zenrock-Foundation/zrchain" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/zenrockfoundation" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://x.com/OfficialZenrock" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/officialZenrock" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Zenrock network

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
    <SmallCard to="https://zenrock-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://zenrock-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://zenrock-grpc.noders.services:49590" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>


