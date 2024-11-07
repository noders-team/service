---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-bitsong">
# Upgrade
</div>
###### Chain ID: `bitsong-2b` | Current Node Version: `v0.17.0`


# Clone BitSong repository
```js
cd $HOME
rm -rf bitsongofficial
git clone https://github.com/bitsongofficial.git
cd bitsongofficial
git checkout v0.17.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.bitsongd/cosmovisor/upgrades/v0.17.0/bin
mv build/bitsongd ~/.bitsongd/cosmovisor/upgrades/v0.17.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone BitSong repository
```js
cd $HOME
rm -rf bitsongofficial
git clone https://github.com/bitsongofficial.git
cd bitsongofficial
git checkout v0.17.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart bitsongd && sudo journalctl -u bitsongd -f --no-hostname -o cat
```