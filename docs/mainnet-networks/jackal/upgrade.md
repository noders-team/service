---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-jackal">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v3.1.2`

```bash
# Clone project repository
cd $HOME
rm -rf canine-chain
git clone https://github.com/JackalLabs/canine-chain.git
cd canine-chain
git checkout v3.1.2

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.canine/cosmovisor/upgrades/v3.1.2/bin
mv build/canined ~/.canine/cosmovisor/upgrades/v3.1.2/bin/
rm -rf build
```