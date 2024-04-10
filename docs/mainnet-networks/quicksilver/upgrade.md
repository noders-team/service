---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-quicksilver">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v1.5.3`

```bash
# Clone project repository
cd $HOME
rm -rf quicksilver-zone
git clone https://github.com/quicksilver-zone.git
cd quicksilver-zone
git checkout v1.5.3

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.quicksilverd/cosmovisor/upgrades/v1.5.3/bin
mv build/quicksilverd ~/.quicksilverd/cosmovisor/upgrades/v1.5.3/bin/
rm -rf build
```