---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-fuel">
# Upgrade
</div>
###### Chain ID: `seq-mainnet-1` | Current Node Version: `seq-mainnet-1.2-improved-sidecar`


# Clone Fuel repository
```js
cd $HOME
rm -rf FuelLabs
git clone https://github.com/FuelLabs.git
cd FuelLabs
git checkout seq-mainnet-1.2-improved-sidecar
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.fuelsequencer/cosmovisor/upgrades/seq-mainnet-1.2-improved-sidecar/bin
mv build/fuelsequencerd ~/.fuelsequencer/cosmovisor/upgrades/seq-mainnet-1.2-improved-sidecar/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Fuel repository
```js
cd $HOME
rm -rf FuelLabs
git clone https://github.com/FuelLabs.git
cd FuelLabs
git checkout seq-mainnet-1.2-improved-sidecar
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart fuelsequencerd && sudo journalctl -u fuelsequencerd -f --no-hostname -o cat
```