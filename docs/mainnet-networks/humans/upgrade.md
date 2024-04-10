---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-humans">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v0.2.2`

```bash
# Clone project repository
cd $HOME
rm -rf humansdotai
git clone https://github.com/humansdotai.git
cd humansdotai
git checkout v0.2.2

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.humansd/cosmovisor/upgrades/v0.2.2/bin
mv build/humansd ~/.humansd/cosmovisor/upgrades/v0.2.2/bin/
rm -rf build
```