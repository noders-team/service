---
hide_table_of_contents: false
title: Upgrade *
sidebar_position: 2
---

<div class="h1-with-icon icon-bitsong">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v0.15.0`

```bash
# Clone project repository
cd $HOME
rm -rf bitsongofficial
git clone https://github.com/bitsongofficial.git
cd bitsongofficial
git checkout v0.15.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.bitsongd/cosmovisor/upgrades/v0.15.0/bin
mv build/bitsongd ~/.bitsongd/cosmovisor/upgrades/v0.15.0/bin/
rm -rf build
```