---
hide_table_of_contents: false
title: "Althea"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-althea">
# Althea
</div>
###### Chain ID: `althea_258432-1` | Current Node Version: `v1.5.1`



# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.althea.net/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/althea-net/althea-chain" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/hHx7HxcycF" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/AltheaNetwork" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Althea network

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
    <SmallCard to="https://althea-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://althea-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://althea-grpc.noders.services:12490" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/mainnet/althea" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>


