---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-realio">
# Upgrade
</div>
###### Chain ID: `realionetwork_3301-1` | Current Node Version: `v1.0.2`


# Clone Realio repository
```js
cd $HOME
rm -rf realio-network
git clone https://github.com/realio-network.git
cd realio-network
git checkout v1.0.2
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.realio-network/cosmovisor/upgrades/v1.0.2/bin
mv build/realiod ~/.realio-network/cosmovisor/upgrades/v1.0.2/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Realio repository
```js
cd $HOME
rm -rf realio-network
git clone https://github.com/realio-network.git
cd realio-network
git checkout v1.0.2
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart realiod && sudo journalctl -u realiod -f --no-hostname -o cat
```