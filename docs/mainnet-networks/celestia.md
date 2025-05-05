---
hide_table_of_contents: false
title: "Celestia"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"
import ChainHero from "@site/src/components/ChainHero"

<ChainHero
  name="Celestia"
  iconUrl="img/celestia-icon.svg"
  scope="Mainnet"
  chainId="mocha-4"
  nodeVersion="v3.4.2"
  stakeUrl="https://keplr.com"
  restakeUrl="https://restake.app"
  websiteUrl="https://celestia.app"
  githubUrl="https://github.com"
  xUrl="https://x.com"
  discordUrl="https://discord.com"
/>

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    <SmallCard to="https://celestia.org/" header={{label: "Website", translateId: "social-telegram"}} iconPath="img/website-icon.svg"/>
    <SmallCard to="https://github.com/celestiaorg/celestia-app" header={{label: "GitHub", translateId: "social-telegram"}} iconPath="img/github-icon.svg"/>
    <SmallCard to="https://discord.gg/celestiacommunity" header={{label: "Discord", translateId: "social-telegram"}} iconPath="img/discord-icon.svg"/>
    <SmallCard to="https://twitter.com/CelestiaOrg" header={{label: "X", translateId: "social-telegram"}} iconPath="img/x-icon.svg"/>
    <SmallCard to="https://t.me/celestiaru" header={{label: "Telegram", translateId: "social-telegram"}} iconPath="img/telegram-icon.svg"/>
</CardLayout>

# Our validator in Celestia network

<CardLayout autoFitEnabled={true}>
    <Card
        to="https://celestia.explorers.guru/validator/celestiavaloper139mu0a0ucz0gmrkavm5wjar2lpx7yvxq3e25e5"
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
    <SmallCard to="https://celestia-rpc.noders.services" header={{label: "RPC Endpoint", translateId: "rpc-endpoint"}}/>
    <SmallCard to="https://celestia-api.noders.services" header={{label: "API Endpoint", translateId: "api-endpoint"}}/>
    
    <SmallCard to="https://celestia-grpc.noders.services:443" header={{label: "gRPC Endpoint", translateId: "grpc-endpoint"}}/>
    <SmallCard to="https://cosmoslist.co/mainnet/celestia" header={{label: "Cosmoslist Endpoint", translateId: "cosmoslist-endpoint"}}/>
</CardLayout>


