---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-haqq">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `1.7.2`

```bash
# Clone project repository
cd $HOME
rm -rf haqq-network
git clone https://github.com/haqq-network.git
cd haqq-network
git checkout 1.7.2

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.haqqd/cosmovisor/upgrades/1.7.2/bin
mv build/haqqd ~/.haqqd/cosmovisor/upgrades/1.7.2/bin/
rm -rf build
```