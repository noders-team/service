---
hide_table_of_contents: false
title: "Initia"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-initia">
# Initia
</div>
###### Chain ID: `initiation-1` | Current Node Version: `v0.2.14`


Initia is a cutting-edge network for interwoven rollups, creating a highly integrated system of modular networks. It combines architectural ownership of the Layer 1 (L1) orchestration layer, Layer 2 (L2) network, and communication protocol to achieve universal consistency. The project aims to enhance scalability, security, and interoperability within the blockchain ecosystem, offering a robust platform for decentralized applications and services.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://initia.xyz/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/initia-labs/initia" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/initia" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/initiaFDN" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Initia network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://app.testnet.initia.xyz/validator/initvaloper18m5xwp0mgq840sq0udutjpax7ngyymgx4ux903"
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
    <SmallCard to="https://initia-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://initia-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://initia-t-grpc.noders.services:32090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
