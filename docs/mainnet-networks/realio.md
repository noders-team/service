---
hide_table_of_contents: false
title: "Realio"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-realio">
# Realio
</div>
###### Chain ID: `realionetwork_3301-1` | Current Node Version: `v1.0.2`


Realio is a blockchain platform designed to support real-world applications. It is built on the Cosmos SDK and uses Tendermint as its consensus engine.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.realio.network/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/realio-network" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/Nv9EUbRnKb" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/realio_network" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Realio network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://rebus.explorers.guru/validator/rebusvaloper1ssvn4vrw8c40r6zgyhhxclhp36n75sulca02pl"
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
    <SmallCard to="https://realio-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://realio-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://realio-jsonrpc.noders.services" header={{label: "json-RPC Endpoint", translateId: "jrpc-endpoint"}}/>
    <SmallCard to="https://realio-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/mainnet/realio" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>


