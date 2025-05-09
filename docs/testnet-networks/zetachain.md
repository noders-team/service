---
hide_table_of_contents: false
title: "Zetachain"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-zetachain">
# Zetachain
</div>
###### Chain ID: `athens_7001-1` | Current Node Version: `v30.0.0`


ZetaChain aims to revolutionize the blockchain landscape by offering a truly interoperable platform that connects disparate blockchain networks, enabling seamless communication and transactions across different ecosystems. As a multi-chain protocol, ZetaChain facilitates the transfer of data and value between all blockchains, whether they are public, private, or consortium, without requiring intermediaries. This open infrastructure supports smart contracts, allowing developers to build applications that can interact with any blockchain from a single platform. ZetaChain's innovative approach not only enhances efficiency and scalability but also opens up new possibilities for decentralized applications, fostering a more integrated and collaborative blockchain environment.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.zetachain.com/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/zeta-chain" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/zetachain" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/zetablockchain" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/zetachainofficial" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Zetachain network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://athens.explorer.zetachain.com/address/0x49A17CCa0Fd5cb5AE9056Bbac316D3FCe098Aed2"
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
    <SmallCard to="https://zetachain-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://zetachain-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    <SmallCard to="https://zetachain-t-jsonrpc.noders.services" header={{label: "json-RPC Endpoint", translateId: "jrpc-endpoint"}}/>
    <SmallCard to="https://zetachain-t-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/testnet/zetachain" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>
