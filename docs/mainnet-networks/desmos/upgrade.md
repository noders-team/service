---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-desmos">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v6.2.1`

```bash
# Clone project repository
cd $HOME
rm -rf desmos-labs
git clone https://github.com/desmos-labs.git
cd desmos-labs
git checkout v6.2.1

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.desmos/cosmovisor/upgrades/v6.2.1/bin
mv build/desmos ~/.desmos/cosmovisor/upgrades/v6.2.1/bin/
rm -rf build
```