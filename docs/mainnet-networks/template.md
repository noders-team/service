---
hide_table_of_contents: false
title: "[CHAIN_NAME]"
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# [CHAIN_NAME]
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[VERSION]`

[CHAIN_DESCRIPTION]
[CHAIN_DESCRIPTION_END]

# Social resources
Official links of social networks of projects

<CardLayout autoFitEnabled={false}>
    [SOCIAL_WEBSITE_BLOCK]
    [SOCIAL_GITHUB_BLOCK]
    [SOCIAL_DISCORD_BLOCK]
    [SOCIAL_X_BLOCK]
    [SOCIAL_TELEGRAM_BLOCK]
</CardLayout>

# Our validator in [CHAIN_NAME] network

<CardLayout autoFitEnabled={true}>
    <Card
        to="[VALIDATOR_LINK]"
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
    [ENDPOINT_RPC_BLOCK]
    [ENDPOINT_API_BLOCK]
    [ENDPOINT_JRPC_BLOCK]
    [ENDPOINT_GRPC_BLOCK]
</CardLayout>


