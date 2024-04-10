---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-rebus">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v0.4.0`

```bash
# Clone project repository
cd $HOME
rm -rf rebuschain
git clone https://github.com/rebuschain.git
cd rebuschain
git checkout v0.4.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.rebusd/cosmovisor/upgrades/v0.4.0/bin
mv build/rebusd ~/.rebusd/cosmovisor/upgrades/v0.4.0/bin/
rm -rf build
```