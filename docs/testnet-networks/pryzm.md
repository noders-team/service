---
hide_table_of_contents: false
title: "Pryzm"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-pryzm">
# Pryzm
</div>
###### Chain ID: `indigo-1` | Current Node Version: `v0.15.0`


Pryzm is revolutionizing the digital world by providing a secure and decentralized identity management platform. It empowers users with self-sovereign identities, enabling them to control their personal data and digital footprints. By harnessing blockchain technology, Pryzm ensures unmatched security, privacy, and interoperability across various applications and services. This platform facilitates seamless authentication, verification, and data exchange processes, eliminating the need for centralized identity repositories. Pryzm is paving the way for a future where digital interactions are more authentic, private, and user-controlled, fostering trust and efficiency in the digital ecosystem.

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://pryzm.zone/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/pryzm-finance" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/mx4kjVG7zN" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/pryzm_zone" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/+uB3fAFC56KIzZDVk" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Pryzm network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.stavr.tech/Pryzm-Testnet/staking/pryzmvaloper1xsuy3ca9z630chuajrrf7au8pn6yymn3ar0qtr"
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
    <SmallCard to="https://pryzm-t-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://pryzm-t-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://pryzm-t-grpc.noders.services:25090" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
</CardLayout>
