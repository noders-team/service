---
hide_table_of_contents: false
title: Upgrade *
sidebar_position: 2
---

<div class="h1-with-icon icon-injective">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v1.12.1`

```bash
# Clone project repository
cd $HOME
rm -rf InjectiveLabs
git clone https://github.com/InjectiveLabs.git
cd InjectiveLabs
git checkout v1.12.1

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.injectived/cosmovisor/upgrades/v1.12.1/bin
mv build/injectived ~/.injectived/cosmovisor/upgrades/v1.12.1/bin/
rm -rf build
```