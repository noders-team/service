---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-umee">
# Upgrade
</div>
###### Chain ID: `umee-1` | Current Node Version: `v6.6.0`


# Clone UX repository
```js
cd $HOME
rm -rf umee-network
git clone https://github.com/umee-network.git
cd umee-network
git checkout v6.6.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.umee/cosmovisor/upgrades/v6.6.0/bin
mv build/umeed ~/.umee/cosmovisor/upgrades/v6.6.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone UX repository
```js
cd $HOME
rm -rf umee-network
git clone https://github.com/umee-network.git
cd umee-network
git checkout v6.6.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart umeed && sudo journalctl -u umeed -f --no-hostname -o cat
```