---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-kyve">
# Upgrade
</div>
###### Chain ID: `kyve-1` | Current Node Version: `v2.1.0`


# Clone Kyve repository
```js
cd $HOME
rm -rf KYVENetwork
git clone https://github.com/KYVENetwork.git
cd KYVENetwork
git checkout v2.1.0
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.kyve/cosmovisor/upgrades/v2.1.0/bin
mv build/kyved ~/.kyve/cosmovisor/upgrades/v2.1.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Kyve repository
```js
cd $HOME
rm -rf KYVENetwork
git clone https://github.com/KYVENetwork.git
cd KYVENetwork
git checkout v2.1.0
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart kyved && sudo journalctl -u kyved -f --no-hostname -o cat
```