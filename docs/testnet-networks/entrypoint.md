---
hide_table_of_contents: false
title: "Entrypoint"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-entrypoint">
# Entrypoint
</div>
###### Chain ID: `entrypoint-pubtest-2` | Current Node Version: `v1.3.0`


EntryPoint revolutionizes the way users interact with blockchain ecosystems by providing a seamless, user-friendly portal for accessing decentralized applications (dApps) and services. It aims to simplify the blockchain experience, making it more accessible to a broader audience, from crypto enthusiasts to newcomers. By integrating various blockchain networks, EntryPoint offers a unified interface that enables easy transactions, asset management, and cross-chain interoperability. Its platform is designed to support a wide range of blockchain functionalities, including DeFi, NFTs, and more, ensuring users have a one-stop solution for their decentralized needs. With security, scalability, and user experience at its core, EntryPoint is set to become a cornerstone in the blockchain community, fostering adoption and innovation.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://entrypoint.zone/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/entrypoint-zone" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/6Ec9jDwVnB" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/entrypointzone" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/entrypointzone" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Entrypoint network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.stavr.tech/Entrypoint-Testnet/staking/entrypointvaloper1qadn0mcaf4sk02c44zfkkknkn2k3dys7hqcl7g"
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
    <SmallCard to="https://entrypoint-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://entrypoint-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://entrypoint-t-grpc.noders.services" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
