---
hide_table_of_contents: false
title: Osmosis
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# [CHAIN_NAME]
###### Chain ID: `[CHAIN_ID]` | Binary Version: `[DAEMON_VERSION]`

[CHAIN_DESCRIPTION]

## Public endpoints 

<CardLayout autoFitEnabled={true}>
    <SmallCard
        to="#"
        header={{
            label: "RPC Endpoint",
            translateId: "rpc-endpoint",
        }}
    />
    <SmallCard
        to="#"
        header={{
            label: "API Endpoint",
            translateId: "api-endpoint",
        }}
    />
    <SmallCard
        to="#"
        header={{
            label: "gRPC-Web Endpoint",
            translateId: "grpc-endpoint",
        }}
    />
</CardLayout>

## We are

<CardLayout autoFitEnabled={true}>
    <Card
        to="#"
        header={{
            label: "Stake with us",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn about the React Native SDKs and how to quickly start building on Solana Mobile.",
            translateId: "learn-programs",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="#"
        header={{
            label: "Our validator",
            translateId: "development-setup",
        }}
        body={{
            label: "Learn how to build a native Android app using the core Solana Kotlin SDKs.",
            translateId: "development-setup-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

## Social resources
See the API for the various client libraries implemented for.

<CardLayout autoFitEnabled={false}>
    <SmallCard
        to="#"
        header={{
            label: "Website",
            translateId: "typescript-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
    <SmallCard
        to="#"
        header={{
            label: "Github",
            translateId: "github-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
    <SmallCard
        to="#"
        header={{
            label: "Discord",
            translateId: "discord-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
    <SmallCard
        to="#"
        header={{
            label: "X",
            translateId: "x-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
    <SmallCard
        to="#"
        header={{
            label: "Telegram",
            translateId: "telegram-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
</CardLayout>
