---
hide_table_of_contents: false
title: "Airchains"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-airchains">
# Airchains
</div>
###### Chain ID: `varanasi-1` | Current Node Version: `v0.3.1`


Airchains is a platform that provides tools for creating modular blockchain solutions. It enables developers to quickly deploy blockchains with integration across various networks, enhancing interoperability and scalability. The platform offers automated deployment processes, chain and bridge management, and supports various protocols and standards. Airchains aims to reduce complexity and accelerate the time to market for blockchain applications. For more detailed information, visit Airchains.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.airchains.io/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/airchains-network/junction" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/ERmFCQc22b" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/airchains_io" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Airchains network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.stavr.tech/Airchains-Testnet/staking/airvaloper1z6q26lprv70xgztfzgnfxgm7t57xh0p0hugz54"
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
    <SmallCard to="https://airchains-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://airchains-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://airchains-t-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/testnet/airchains" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>
