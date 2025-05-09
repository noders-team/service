---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-crossfi">
# Upgrade
</div>
###### Chain ID: `crossfi-evm-testnet-1` | Current Node Version: `v0.4.0`

# With Cosmovisor
## Clone CrossFI repository
```js
cd $HOME
rm -rf crossfichain
git clone https://github.com/crossfichain.git
cd crossfichain
git checkout v0.4.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.mineplex-chain/cosmovisor/upgrades/v0.4.0/bin
mv build/crossfid ~/.mineplex-chain/cosmovisor/upgrades/v0.4.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone CrossFI repository
```js
cd $HOME
rm -rf crossfichain
git clone https://github.com/crossfichain.git
cd crossfichain
git checkout v0.4.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart crossfid && sudo journalctl -u crossfid -f --no-hostname -o cat
```