---
hide_table_of_contents: false
title: Installation Guide
sidebar_position: 1
---

<div class="h1-with-icon icon-osmosis">
# Osmosis Node Installation Guide
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

## Install dependencies

```bash
# Install dependencies for building from source
sudo apt update
sudo apt install -y curl git jq lz4 build-essential

# Install Go
sudo rm -rf /usr/local/go
curl -L https://go.dev/dl/go1.21.6.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bash_profile
source .bash_profile
```

## Download and build binaries

## Install Cosmovisor and create a service

## Initialize the node

## Start service and check the logs

:::note The Solana Flutter SDK is a community-developed and maintained project and it is not an official library. Please be understanding if certain areas are still under development. Your contributions are always welcome to help address any issues you may encounter.

Thank you to the Espresso Cash team for your active maintanence of this library! :::