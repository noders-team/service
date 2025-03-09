---
hide_table_of_contents: false
title: "Axone"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-axone">
# Axone
</div>
###### Chain ID: `axone-dentrite-1` | Current Node Version: `auto`


Axone's intuitive protocol lets you orchestrate sophisticated AI processes with ease. Seamlessly link resources, models, and data. Create powerful AI workflows with trust-minimized collaboration. Ensure fair rewards for every contribution. That's the Axone promise.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.axone.xyz/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/axone-protocol" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/axone" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://x.com/axonexyz" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Axone network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://testnet.axone.explorers.guru/validator/axonevaloper1zux0q0unnu9s0sz9kfy074e0rp7cj909yf4hc8"
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
    <SmallCard to="https://axone-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://axone-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://axone-t-grpc.noders.services:20090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>