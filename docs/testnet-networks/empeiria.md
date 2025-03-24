---
hide_table_of_contents: false
title: "Empeiria"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-empeiria">
# Empeiria
</div>
###### Chain ID: `empe-testnet-2` | Current Node Version: `v0.3.0`


Empeiria is the first End-to-End Verifiable Data Infrastructure (EVDI). It enables seamless web3 adoption through one-click deployment, empowering organizations with the data of the future.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://empe.io/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/empe-io" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/crossfi" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/empe_io" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/web3Empeiria" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Empeiria network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.stavr.tech/Empeiria-Testnet/staking/empevaloper1wmqc6ak6st207q69qdatp6fpr0x6r6ekk4km9v"
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
    <SmallCard to="https://empeiria-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://empeiria-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://empeiria-t-grpc.noders.services:11290" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/testnet/empeiria" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>
