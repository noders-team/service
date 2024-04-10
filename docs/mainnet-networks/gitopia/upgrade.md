---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-gitopia">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v3.3.0`

```bash
# Clone project repository
cd $HOME
rm -rf gitopia
git clone https://github.com/gitopia.git
cd gitopia
git checkout v3.3.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.gitopia/cosmovisor/upgrades/v3.3.0/bin
mv build/gitopiad ~/.gitopia/cosmovisor/upgrades/v3.3.0/bin/
rm -rf build
```