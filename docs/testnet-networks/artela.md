---
hide_table_of_contents: false
title: "Artela"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-artela">
# Artela
</div>
###### Chain ID: `artela_11822-1` | Current Node Version: `v0.4.7-rc6`


Artela Network revolutionizes the digital art space by leveraging blockchain technology to empower artists and creators. This innovative platform offers a decentralized marketplace for digital artworks, ensuring authenticity, ownership, and provenance through secure NFTs. Artela Network enables artists to monetize their creations directly, fostering a vibrant community where art enthusiasts can discover, buy, and collect unique digital pieces. By integrating blockchain's transparency and security, Artela Network is setting a new standard for digital art, making it accessible and rewarding for creators and collectors alike.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://artela.network/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/artela-network" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.com/invite/artela" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/artela_network" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    
</CardLayout>

# Our validator in Artela network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://testnet.itrocket.net/artela/staking/artvaloper1gjju20vjss6a5w0w3nz575637wg0mrw0rvqujq"
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
    <SmallCard to="https://artela-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://artela-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://artela-t-grpc.noders.services" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
