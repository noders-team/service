---
hide_table_of_contents: false
title: "Story"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-story">
# Story
</div>
###### Chain ID: `auto` | Current Node Version: `auto`


Story is the World’s IP Blockchain, onramping Programmable IP to power the next generation of AI, DeFi, and consumer applications.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.story.foundation/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/storyprotocol" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/storyprotocol" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://x.com/StoryProtocol" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Story network

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
    <SmallCard to="https://story.rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://story.api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://story.jsonrpc.noders.services" header={{label: "json-RPC Endpoint", translateId: "jrpc-endpoint"}}/>
    
</CardLayout>