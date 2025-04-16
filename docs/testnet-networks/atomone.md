---
hide_table_of_contents: false
title: "Atomone"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-atomone">
# Atomone
</div>
###### Chain ID: `atomone-testnet-1` | Current Node Version: `v1.1.2`


The vision behind this AtomOne fork is to be an alternative minimal fork of Gaia ("cosmoshub4") running alongside Gaia to prepare for all contingencies, and also to operate as a political party base in relation to Gaia. We strive to complement the broader Cosmos ecosystem while introducing innovative solutions and perspectives. Our goals are not just to resolve current challenges but also to set a new precedent for adaptive and responsive self-organization in the multichain multitoken universe that we call the Cosmos.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    
    <SmallCard to="https://github.com/atomone-hub/atomone" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/FEgcVkNYBA" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://x.com/_atomone" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Atomone network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://testnet.itrocket.net/atomone/staking/atonevaloper1ae23c50dwazpg98eafy0h8pfjhpkn7e3jqrdvg"
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
    <SmallCard to="https://atomone-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://atomone-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://atomone-t-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/testnet/atomone" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>
