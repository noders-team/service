---
hide_table_of_contents: false
title: "Galactica"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-galactica">
# Galactica
</div>
###### Chain ID: `galactica_9302-1` | Current Node Version: `v0.1.2`


Galactica Network presents itself as a pioneering platform in the Web3 space, aiming to establish the first on-chain nation-state. It's focused on fostering Sybil-resistant, reputation-based systems and decentralized societies (DeSoc), enhancing DeFi and DAOs for a more accountable and compliant future. Galactica emphasizes a community-driven approach, seeking builders to create a better future through innovative DeFi solutions, DAO structures, and a comprehensive DeSoc stack

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://galactica.com/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/Galactica-corp/networks" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/galactica" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/GalacticaNet" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/TheCypherState" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Galactica network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://ping.pfc.zone/galactica-testnet/staking/galavaloper1p0gs5uq44usv2fnx0qcw785jj2ey76svjtlgx7"
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
    <SmallCard to="https://galactica-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://galactica-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://galactica-t-json.noders.services" header={{label: "json-RPC Endpoint", translateId: "jrpc-endpoint"}}/>
    <SmallCard to="https://galactica-t-grpc.noders.services" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>