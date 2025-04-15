---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-arkeo">
# Upgrade
</div>
###### Chain ID: `arkeo-main-v1` | Current Node Version: `v1.0.9`


# Clone Arkeo repository
```js
cd $HOME
rm -rf arkeonetwork
git clone https://github.com/arkeonetwork.git
cd arkeonetwork
git checkout v1.0.9
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.arkeo/cosmovisor/upgrades/v1.0.9/bin
mv build/arkeod ~/.arkeo/cosmovisor/upgrades/v1.0.9/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Arkeo repository
```js
cd $HOME
rm -rf arkeonetwork
git clone https://github.com/arkeonetwork.git
cd arkeonetwork
git checkout v1.0.9
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart arkeod && sudo journalctl -u arkeod -f --no-hostname -o cat
```