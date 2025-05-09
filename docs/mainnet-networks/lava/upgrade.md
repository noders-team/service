---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-lava">
# Upgrade
</div>
###### Chain ID: `lava-mainnet-1` | Current Node Version: `v5.3.0`


# Clone Lava repository
```js
cd $HOME
rm -rf lavanet
git clone https://github.com/lavanet.git
cd lavanet
git checkout v5.3.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.lava/cosmovisor/upgrades/v5.3.0/bin
mv build/lavad ~/.lava/cosmovisor/upgrades/v5.3.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Lava repository
```js
cd $HOME
rm -rf lavanet
git clone https://github.com/lavanet.git
cd lavanet
git checkout v5.3.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart lavad && sudo journalctl -u lavad -f --no-hostname -o cat
```