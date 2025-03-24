---
hide_table_of_contents: false
title: "Kopi"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-kopi">
# Kopi
</div>
###### Chain ID: `luwak-1` | Current Node Version: `v18.4`


Kopi is the latest project in DeFi and offers a decentralized exchange as well as its own supply managed coins (kCoins).

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://kopi.money/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/kopi-money/kopi" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/GvnwSwsCcs" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/kopi_money/" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/+_hk--L9mKKc4MThk" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Kopi network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://explorer.kopi.money/kopi-test-4/staking/kopivaloper1en8f3y0wx52npwmxw2jy2qghy2acar55w9h39d"
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
    <SmallCard to="https://kopi-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://kopi-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="http://kopi-grpc.noders.services:30790" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/mainnet/kopi" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>


