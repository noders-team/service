---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-kyve">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v1.4.0`

```bash
# Clone project repository
cd $HOME
rm -rf KYVENetwork
git clone https://github.com/KYVENetwork.git
cd KYVENetwork
git checkout v1.4.0

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.kyve/cosmovisor/upgrades/v1.4.0/bin
mv build/kyved ~/.kyve/cosmovisor/upgrades/v1.4.0/bin/
rm -rf build
```