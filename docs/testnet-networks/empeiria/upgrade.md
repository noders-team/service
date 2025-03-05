---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-empeiria">
# Upgrade
</div>
###### Chain ID: `empe-testnet-2` | Current Node Version: `v0.3.0`

# With Cosmovisor
## Clone Empeiria repository
```js
cd $HOME
rm -rf empe-io
git clone https://github.com/empe-io.git
cd empe-io
git checkout v0.3.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.empe-chain/cosmovisor/upgrades/v0.3.0/bin
mv build/emped ~/.empe-chain/cosmovisor/upgrades/v0.3.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Empeiria repository
```js
cd $HOME
rm -rf empe-io
git clone https://github.com/empe-io.git
cd empe-io
git checkout v0.3.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart emped && sudo journalctl -u emped -f --no-hostname -o cat
```