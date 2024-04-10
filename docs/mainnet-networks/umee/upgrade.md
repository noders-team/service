---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-umee">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v6.3.0`

```bash
# Clone project repository
cd $HOME
rm -rf umee-network
git clone https://github.com/umee-network.git
cd umee-network
git checkout v6.3.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.umee/cosmovisor/upgrades/v6.3.0/bin
mv build/umeed ~/.umee/cosmovisor/upgrades/v6.3.0/bin/
rm -rf build
```