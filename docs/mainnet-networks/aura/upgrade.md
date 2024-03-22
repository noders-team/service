---
hide_table_of_contents: false
title: Upgrade *
sidebar_position: 2
---

<div class="h1-with-icon icon-aura">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v0.7.2`

```bash
# Clone project repository
cd $HOME
rm -rf aura-nw
git clone https://github.com/aura-nw.git
cd aura-nw
git checkout v0.7.2

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.aura/cosmovisor/upgrades/v0.7.2/bin
mv build/aurad ~/.aura/cosmovisor/upgrades/v0.7.2/bin/
rm -rf build
```