---
hide_table_of_contents: false
title: template
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# [CHAIN_NAME]
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[DAEMON_VERSION]`

[CHAIN_DESCRIPTION]

## Public endpoints 

<CardLayout autoFitEnabled={true}>
    [ENDPOINT_RPC_BLOCK]
    [ENDPOINT_API_BLOCK]
    [ENDPOINT_GRPCWEB_BLOCK]
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
            translateId: "development-setup-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

## Social resources
See the API for the various client libraries implemented for.

<CardLayout autoFitEnabled={false}>
    [SOCIAL_WEBSITE_BLOCK]
    [SOCIAL_GITHUB_BLOCK]
    [SOCIAL_DISCORD_BLOCK]
    [SOCIAL_X_BLOCK]
    [SOCIAL_TELEGRAM_BLOCK]
</CardLayout>
