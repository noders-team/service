---
hide_table_of_contents: false
title: "DoraVota"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-dora">
# DoraVota
</div>
###### Chain ID: `null` | Current Node Version: `v0.4.2`


Dora Vota is the appchain supporting decentralized governance and privacy on-chain communication. Currently, the appchain is hosting major quadratic funding and MACI (Minimal Anti-collusion Infrastructure) / aMACI (anonymous MACI) rounds.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://dorafactory.org/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/DoraFactory/doravota" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/gKT5DsWwQ5" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/DoraFactory" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in DoraVota network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://vota-bobtail-explorer.dorafactory.org/vota-bobtail/staking/doravaloper1zyhzwtehcs4y8pgdhz6a5aqmnaycns57vpetlc"
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
    <SmallCard to="https://dora-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://dora-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://dora-t-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    
</CardLayout>
