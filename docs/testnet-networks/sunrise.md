---
hide_table_of_contents: false
title: "Sunrise"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-sunrise">
# Sunrise
</div>
###### Chain ID: `sunrise-test-0.2` | Current Node Version: `v0.2.3`


Sunrise is a specialized Data Availability Layer for Proof of Liquidity.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://sunriselayer.io/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/sunriselayer/sunrise" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/sunrise" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/SunriseLayer" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Sunrise network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://testnet.sunrise.explorers.guru/validator/sunrisevaloper1knkwlqqxky07f7vu6vgxna49m2tf9aa9j7fnkt"
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
    <SmallCard to="https://sunrise-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://sunrise-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://sunrise-t-grpc.noders.services:28390" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>