---
hide_table_of_contents: false
title: Upgrade *
sidebar_position: 2
---

<div class="h1-with-icon icon-archway">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v4.0.3`

```bash
# Clone project repository
cd $HOME
rm -rf archway-network
git clone https://github.com/archway-network.git
cd archway-network
git checkout v4.0.3

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.archwayd/cosmovisor/upgrades/v4.0.3/bin
mv build/archwayd ~/.archwayd/cosmovisor/upgrades/v4.0.3/bin/
rm -rf build
```