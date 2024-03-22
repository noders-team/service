---
hide_table_of_contents: false
title: Upgrade *
sidebar_position: 2
---

<div class="h1-with-icon icon-andromeda">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `andromeda-1-v0.1.0`

```bash
# Clone project repository
cd $HOME
rm -rf andromedaprotocol
git clone https://github.com/andromedaprotocol.git
cd andromedaprotocol
git checkout andromeda-1-v0.1.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.andromeda/cosmovisor/upgrades/andromeda-1-v0.1.0/bin
mv build/andromedad ~/.andromeda/cosmovisor/upgrades/andromeda-1-v0.1.0/bin/
rm -rf build
```