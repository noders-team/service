---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 2
---

<div class="h1-with-icon icon-lambda">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v1.0.1`

```bash
# Clone project repository
cd $HOME
rm -rf LambdaIM
git clone https://github.com/LambdaIM.git
cd LambdaIM
git checkout v1.0.1

# Build binaries
make build

# Prepare binaries for Cosmovisor
mkdir -p ~/.lambdavm/cosmovisor/upgrades/v1.0.1/bin
mv build/lambdavm ~/.lambdavm/cosmovisor/upgrades/v1.0.1/bin/
rm -rf build
```