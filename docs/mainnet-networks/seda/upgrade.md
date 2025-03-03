---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-seda">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`


# Clone Seda repository
```js
cd $HOME
rm -rf seda-chain
git clone https://github.com/sedaprotocol/seda-chain.git
cd seda-chain
git checkout auto
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.sedad/cosmovisor/upgrades/auto/bin
mv build/sedad ~/.sedad/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Seda repository
```js
cd $HOME
rm -rf seda-chain
git clone https://github.com/sedaprotocol/seda-chain.git
cd seda-chain
git checkout auto
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart sedad && sudo journalctl -u sedad -f --no-hostname -o cat
```