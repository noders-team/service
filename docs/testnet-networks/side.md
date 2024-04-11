---
hide_table_of_contents: false
title: "Side"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-side">
# Side
</div>
###### Chain ID: `side-testnet-3` | Current Node Version: `v0.7.0-rc2`


Side Protocol emerges as a pivotal exchange layer for Web3, aiming to redefine decentralized finance (DeFi) by ensuring secure, transparent, and efficient cryptocurrency transactions. Embracing user-centric and developer-friendly approaches, it offers a robust platform that simplifies DeFi integration and usage. Through its commitment to innovation and reliability, Side Protocol is set to empower the digital asset space, facilitating a seamless exchange experience across the Web3 ecosystem.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://side.one/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/sideprotocol" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/sideprotocol" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/SideProtocol" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/SideProtocolOfficial" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Side network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.stavr.tech/Side-Testnet/staking/bcvaloper17tn2zvychzan0v0ulakq596gczmjtw8pdqary7"
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
    <SmallCard to="https://side-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://side-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://side-t-grpc.noders.services" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
