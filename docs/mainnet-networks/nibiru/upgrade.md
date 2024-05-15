---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-nibiru">
# Upgrade
</div>
###### Chain ID: `cataclysm-1` | Current Node Version: `v1.3.0`


# Clone Nibiru repository
```js
cd $HOME
rm -rf NibiruChain
git clone https://github.com/NibiruChain.git
cd NibiruChain
git checkout v1.3.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.nibid/cosmovisor/upgrades/v1.3.0/bin
mv build/nibid ~/.nibid/cosmovisor/upgrades/v1.3.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Nibiru repository
```js
cd $HOME
rm -rf NibiruChain
git clone https://github.com/NibiruChain.git
cd NibiruChain
git checkout v1.3.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart nibid && sudo journalctl -u nibid -f --no-hostname -o cat
```