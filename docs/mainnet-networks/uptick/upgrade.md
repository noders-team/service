---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-uptick">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v0.2.19`

```bash
# Clone project repository
cd $HOME
rm -rf UptickNetwork
git clone https://github.com/UptickNetwork.git
cd UptickNetwork
git checkout v0.2.19

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.uptickd/cosmovisor/upgrades/v0.2.19/bin
mv build/uptickd ~/.uptickd/cosmovisor/upgrades/v0.2.19/bin/
rm -rf build
```