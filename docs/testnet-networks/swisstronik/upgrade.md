---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-swisstronik">
# Upgrade
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

# With Cosmovisor
## Clone Swisstronik repository
```js
cd $HOME
rm -rf SigmaGmbH
git clone https://github.com/SigmaGmbH.git
cd SigmaGmbH
git checkout auto
 ```

## Build binaries
```js
make build
 ```

## Prepare binaries for Cosmovisor
```js
mkdir -p ~/.swisstronik/cosmovisor/upgrades/auto/bin
mv build/swisstronikd ~/.swisstronik/cosmovisor/upgrades/auto/bin/
rm -rf build
```

# Without Cosmovisor
## Clone Swisstronik repository
```js
cd $HOME
rm -rf SigmaGmbH
git clone https://github.com/SigmaGmbH.git
cd SigmaGmbH
git checkout auto
 ```

## Build binaries
```js
make install
 ```

### Restart node and check logs
```js
sudo systemctl restart swisstronikd && sudo journalctl -u swisstronikd -f --no-hostname -o cat
```