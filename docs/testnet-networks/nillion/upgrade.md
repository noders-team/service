---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-nillion">
# Upgrade
</div>
###### Chain ID: `nillion-chain-testnet-1` | Current Node Version: `v0.2.1`

# With Cosmovisor
## Clone Nillion repository
```js
cd $HOME
rm -rf NillionNetwork
git clone https://github.com/NillionNetwork.git
cd NillionNetwork
git checkout v0.2.1
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.nilliond/cosmovisor/upgrades/v0.2.1/bin
mv build/nilliond ~/.nilliond/cosmovisor/upgrades/v0.2.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Nillion repository
```js
cd $HOME
rm -rf NillionNetwork
git clone https://github.com/NillionNetwork.git
cd NillionNetwork
git checkout v0.2.1
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart nilliond && sudo journalctl -u nilliond -f --no-hostname -o cat
```