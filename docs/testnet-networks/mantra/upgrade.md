---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-mantra">
# Upgrade
</div>
###### Chain ID: `mantra-hongbai-1` | Current Node Version: `v3.0.0`

# With Cosmovisor
## Clone Mantra repository
```js
cd $HOME
rm -rf public
git clone https://github.com/MANTRA-Finance/public.git
cd public
git checkout v3.0.0
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.mantrachaind/cosmovisor/upgrades/v3.0.0/bin
mv build/mantrachaind ~/.mantrachaind/cosmovisor/upgrades/v3.0.0/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Mantra repository
```js
cd $HOME
rm -rf public
git clone https://github.com/MANTRA-Finance/public.git
cd public
git checkout v3.0.0
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart mantrachaind && sudo journalctl -u mantrachaind -f --no-hostname -o cat
```