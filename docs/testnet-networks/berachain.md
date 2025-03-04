---
hide_table_of_contents: false
title: "Berachain"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-berachain">
# Berachain
</div>
###### Chain ID: `bartio-beacon-80084` | Current Node Version: `v0.2.0-alpha.8`


Berachain is a high-performance EVM-compatible blockchain built on Proof-of-Liquidity consensus.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.berachain.com/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/berachain" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/berachain" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/berachain" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/BerachainPortal" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Berachain network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://bartio.station.berachain.com/validators/0x7d0f205f4a7F10B7B1c6282193aA202dC16fBbbe"
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
    <SmallCard to="https://berachain-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    
    <SmallCard to="http://berachain-t-jsonrpc.noders.services:80" header={{label: "json-RPC Endpoint", translateId: "jrpc-endpoint"}}/>
    
</CardLayout>