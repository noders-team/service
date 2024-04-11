---
hide_table_of_contents: false
title: "ZeroGravity"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-og">
# ZeroGravity
</div>
###### Chain ID: `zgtendermint_9000-1` | Current Node Version: `v1.0.0-testnet`


The scalability of 0G hinges on the idea of separating the workflow of data availability into data publishing lane and data storage lane. Large volume of data transfers happen on the data storage lane that is supported by the storage layer which achieves the horizontal scalability through well designed partitioning, while the data publishing lane guarantees the data availability property through consensus of data availability sampling which only requires tiny data flowing through the consensus protocol to avoid the broadcasting bottleneck. Data storage is an integral part of data availability because it must answer the question of where the data is published.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://0g.ai/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/0glabs/0g-evmos.git" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="http://discord.gg/0glabs" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/0G_labs" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/web3_0glabs" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in ZeroGravity network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.validatorvn.com/OG-Testnet/staking/evmosvaloper1n30zgt2nc3auawqlsgkqmwz9u3r0zdwnu9xjc4"
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
    <SmallCard to="https://og-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://og-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://og-t-json.noders.services" header={{label: "json-RPC Endpoint", translateId: "jrpc-endpoint"}}/>
    <SmallCard to="https://og-t-grpc.noders.services" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
