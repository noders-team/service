---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-dymension">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v3.0.0`

```bash
# Clone project repository
cd $HOME
rm -rf dymensionxyz
git clone https://github.com/dymensionxyz.git
cd dymensionxyz
git checkout v3.0.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.dymension/cosmovisor/upgrades/v3.0.0/bin
mv build/dymd ~/.dymension/cosmovisor/upgrades/v3.0.0/bin/
rm -rf build
```