---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-seda">
# Upgrade
</div>
###### Chain ID: `seda-1` | Current Node Version: `v0.1.1`


# Clone Seda repository
```js
cd $HOME
rm -rf sedaprotocol
git clone https://github.com/sedaprotocol.git
cd sedaprotocol
git checkout v0.1.1
 ```

# Build binaries
```js
make build
 ```

# Prepare binaries for Cosmovisor
```js
mkdir -p ~/.sedad/cosmovisor/upgrades/v0.1.1/bin
mv build/sedad ~/.sedad/cosmovisor/upgrades/v0.1.1/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Seda repository
```js
cd $HOME
rm -rf sedaprotocol
git clone https://github.com/sedaprotocol.git
cd sedaprotocol
git checkout v0.1.1
 ```

## Build binaries
```js
make install
 ```

## Restart node and check logs
```js
sudo systemctl restart sedad && sudo journalctl -u sedad -f --no-hostname -o cat
```