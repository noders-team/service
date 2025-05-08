---
hide_table_of_contents: false
title: "Router"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-router">
# Router
</div>
###### Chain ID: `router_9600-1` | Current Node Version: `v1.6.0`


The Router Chain is a layer 1 blockchain that leverages tendermint’s Byzantine Fault Tolerant (BFT) consensus engine

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.routerprotocol.com/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/router-protocol" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/yjM2fUUHvN" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/routerprotocol" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/routerprotocol" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Router network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://routerscan.io/validators/routervaloper1wf2sev9705ujesda8rzncr60xjgvt3mjzd5kne"
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
    <SmallCard to="https://router-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://router-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://router-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/mainnet/router" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>


