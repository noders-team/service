---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-osmosis">
# Upgrade
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

```bash
# Clone project repository
cd $HOME
rm -rf osmosis
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v23.0.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.osmosisd/cosmovisor/upgrades/v23.0.0/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/v23.0.0/bin/
rm -rf build
```