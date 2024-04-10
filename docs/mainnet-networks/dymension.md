---
hide_table_of_contents: false
title: template
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-dymension">
# Dymension
</div>
###### Chain ID: `` | Current Node Version: `v3.0.0`

Dymension is a pioneering blockchain project designed to revolutionize the way we think about scalability and interoperability in the blockchain ecosystem. Positioned as a Layer 2 scaling solution, Dymension leverages rollup technology to enhance the performance of existing Layer 1 blockchains, such as Ethereum, by providing faster transaction throughput, reduced gas fees, and improved scalability without compromising on security or decentralization.

## Public endpoints 

<CardLayout autoFitEnabled={true}>
    
    
    
</CardLayout>

## Our validator

<CardLayout autoFitEnabled={true}>
    <Card
        to="#"
        header={{
            label: "[NODERS]TEAM",
            translateId: "development-setup",
        }}
        body={{
            label: "Trusted blockchain validator",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

## Social resources
See the API for the various client libraries implemented for.

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://dymension.xyz/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/dymensionxyz" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/dymension" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/dymension" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/dymensionXYZ" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>
