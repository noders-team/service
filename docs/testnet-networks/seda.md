---
hide_table_of_contents: false
title: "Seda"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-seda">
# Seda
</div>
###### Chain ID: `seda-1-testnet` | Current Node Version: `v0.0.7`


SEDA is at the forefront of the decentralized finance revolution, offering a comprehensive platform designed to democratize access to financial services. By leveraging blockchain technology, SEDA introduces a transparent, secure, and accessible ecosystem where users can engage in lending, borrowing, and trading without the need for traditional financial intermediaries.

This platform is built with the user in mind, featuring an intuitive interface that makes navigating the complexities of DeFi straightforward. SEDA's innovative protocols ensure high liquidity, low slippage, and competitive yields across a variety of digital assets.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://www.seda.xyz/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/sedaprotocol" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/Ae4V6y6qrW" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/sedaprotocol" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/sedaprotocol" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Seda network

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
    <SmallCard to="https://seda-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://seda-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://seda-t-grpc.noders.services:24090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
