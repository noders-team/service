---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-lambda">
# Upgrade
</div>
###### Chain ID: `` | Current Node Version: `v`


# Clone Lambda repository
```js
cd $HOME
rm -rf LambdaIM
git clone https://github.com/LambdaIM.git
cd LambdaIM
git checkout v
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.lambdavm/cosmovisor/upgrades/v/bin
mv build/lambdavm ~/.lambdavm/cosmovisor/upgrades/v/bin/
rm -rf build
```