---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-swisstronic">
# Upgrade
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.1`


# Clone Swisstronic repository
```js
cd $HOME
rm -rf SigmaGmbH
git clone https://github.com/SigmaGmbH.git
cd SigmaGmbH
git checkout v1.0.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.swisstronik/cosmovisor/upgrades/v1.0.1/bin
mv build/swisstronikd ~/.swisstronik/cosmovisor/upgrades/v1.0.1/bin/
rm -rf build
```