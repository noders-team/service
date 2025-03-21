---
hide_table_of_contents: false
title: "Mantra"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-mantra">
# Mantra
</div>
###### Chain ID: `mantra-dukong-1` | Current Node Version: `v3.0.0`


Mantra Chain emerges as a pioneering Layer 1 blockchain, strategically crafted to bridge traditional finance (TradFi) and decentralized finance (DeFi). Its foundation rests on a solid infrastructure built for the tokenization of real-world assets (RWAs), ensuring adherence to regulatory requirements essential for institutional trust and security. This platform serves as a compliant framework that empowers institutions, businesses, developers, and users to seamlessly create, trade, and manage RWAs at the protocol level.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.mantrachain.io/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/MANTRA-Finance/public" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/gfks4TwAJV" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/MANTRA_Chain" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/MANTRA_Chain" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Mantra network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.stavr.tech/Mantra-Testnet/staking/mantravaloper1aysxyetv0y7sfe0v70akyjn3kkjc6qyt5dlewa"
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
    <SmallCard to="https://mantra-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://mantra-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://mantra-t-grpc.noders.services:30090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>