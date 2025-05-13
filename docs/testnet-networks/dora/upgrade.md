---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-dora">
# Upgrade
</div>
###### Chain ID: `null` | Current Node Version: `v0.4.2`

# With Cosmovisor
## Clone DoraVota repository
```js
cd $HOME
rm -rf doravota
git clone https://github.com/DoraFactory/doravota.git
cd doravota
git checkout v0.4.2
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.dorad/cosmovisor/upgrades/v0.4.2/bin
mv build/dorad ~/.dorad/cosmovisor/upgrades/v0.4.2/bin/
rm -rf build
```

# Without Cosmovisor
## Clone DoraVota repository
```js
cd $HOME
rm -rf doravota
git clone https://github.com/DoraFactory/doravota.git
cd doravota
git checkout v0.4.2
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart dorad && sudo journalctl -u dorad -f --no-hostname -o cat
```