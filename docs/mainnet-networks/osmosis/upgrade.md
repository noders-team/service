---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

# Upgrade

```bash
# Clone project repository
cd $HOME
rm -rf quicksilver
git clone https://github.com/ingenuity-build/quicksilver.git
cd quicksilver
git checkout v1.4.7

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p $HOME/.quicksilverd/cosmovisor/upgrades/v1.4.7/bin
mv build/quicksilverd $HOME/.quicksilverd/cosmovisor/upgrades/v1.4.7/bin/
rm -rf build
```