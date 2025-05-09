---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-airchains">
# Upgrade
</div>
###### Chain ID: `varanasi-1` | Current Node Version: `v0.3.2`

# With Cosmovisor
## Clone Airchains repository
```js
cd $HOME
rm -rf junction
git clone https://github.com/airchains-network/junction.git
cd junction
git checkout v0.3.2
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.junction/cosmovisor/upgrades/v0.3.2/bin
mv build/junctiond ~/.junction/cosmovisor/upgrades/v0.3.2/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Airchains repository
```js
cd $HOME
rm -rf junction
git clone https://github.com/airchains-network/junction.git
cd junction
git checkout v0.3.2
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart junctiond && sudo journalctl -u junctiond -f --no-hostname -o cat
```