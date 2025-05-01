---
hide_table_of_contents: false
title: "Celestia"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-celestia">
# Celestia
</div>
###### Chain ID: `mocha-4` | Current Node Version: `3.8.1-mocha`


Celestia introduces a modular data availability network to enhance blockchain scalability and flexibility. It features a minimal design focusing on transaction ordering and data availability, decoupling consensus from execution for improved scalability. This approach allows for customized execution layers, powered by a secure Proof of Stake mechanism. Celestia's innovation lies in its ability to ensure transaction data is verifiable without downloading the entire chain, offering a foundation for scalable, efficient blockchain applications.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://celestia.org/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/celestiaorg/celestia-app" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/celestiacommunity" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/CelestiaOrg" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/celestiaru" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Celestia network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://testnet.celestia.explorers.guru/validator/celestiavaloper1zzxrq7tjlsqvv0jtqtlt8gjaa68racukf5n9xh"
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
    <SmallCard to="https://celestia-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://celestia-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://celestia-t-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/testnet/celestia" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>
