---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-band">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v2.5.4`

```bash
# Clone project repository
cd $HOME
rm -rf chain
git clone https://github.com/bandprotocol/chain.git
cd chain
git checkout v2.5.4

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.band/cosmovisor/upgrades/v2.5.4/bin
mv build/bandd ~/.band/cosmovisor/upgrades/v2.5.4/bin/
rm -rf build
```