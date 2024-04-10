---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-stratos">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `vv0.11.3`

```bash
# Clone project repository
cd $HOME
rm -rf stratos-chain
git clone https://github.com/stratosnet/stratos-chain.git
cd stratos-chain
git checkout vv0.11.3

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.stchaind/cosmovisor/upgrades/vv0.11.3/bin
mv build/stchaind ~/.stchaind/cosmovisor/upgrades/vv0.11.3/bin/
rm -rf build
```