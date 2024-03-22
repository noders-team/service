---
hide_table_of_contents: false
title: template
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-celestia">
# Celestia
</div>
###### Chain ID: `` | Current Node Version: `v1.6.0`

Celestia stands out as a groundbreaking project within the blockchain ecosystem, offering a modular data availability network designed to scale securely with user growth.

It simplifies the process of launching personalized blockchains by providing a foundational layer that prioritizes data availability. Here's a concise overview of its core features:

Modularity: Celestia is crafted as a minimal blockchain that focuses on ordering and publishing transactions without executing them. This distinct separation between the consensus and execution layers modularizes the blockchain technology stack, allowing for greater flexibility and scalability.

Data Availability: At the heart of Celestia's innovation is its approach to ensuring data availability. This is crucial for verifying the validity of transactions without the need to download the entire blockchain. It addresses the fundamental question of whether transaction data has been published and is accessible for verification purposes.

Decoupling Consensus and Execution: By separating the consensus mechanism from transaction execution, Celestia enables a more efficient and scalable blockchain infrastructure. This architecture allows developers to build customized execution environments atop the Celestia network, tailored to their specific application needs.

Proof of Stake (PoS) Layer: Celestia incorporates a PoS layer for its data availability, ensuring a secure and decentralized mechanism for network participation. This not only contributes to the network's security but also promotes an energy-efficient consensus mechanism compared to traditional proof-of-work systems.

Celestia's innovative approach to blockchain architecture represents a significant step forward in the development of decentralized technologies. It offers developers and organizations the tools to create more scalable, efficient, and flexible blockchain solutions, paving the way for a new era of blockchain applications that can cater to the growing demands of users and industries.

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
    <SmallCard to="https://celestia.org/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/celestiaorg" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/celestiacommunity" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/CelestiaOrg" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/celestiaru" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>
