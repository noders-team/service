---
hide_table_of_contents: false
title: Upgrade
sidebar_position: 3
---

<div class="h1-with-icon icon-airchains">
# Upgrade
</div>
###### Chain ID: `junction` | Current Node Version: `v0.1.0`

# With Cosmovisor
## Clone Airchains repository
```js
cd $HOME
wget -O junctiond https://github.com/airchains-network/junction/releases/download/v0.1.0/junctiond
chmod +x junctiond
 ```

## Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.junction/cosmovisor/upgrades/v0.1.0/bin
mv $HOME/junctiond ~/.junction/cosmovisor/upgrades/v0.1.0/bin/
```

# Without Cosmovisor
## Clone Airchains repository
```js
cd $HOME
wget -O junctiond https://github.com/airchains-network/junction/releases/download/v0.1.0/junctiond
chmod +x junctiond
mv $HOME/junctiond $HOME/go/bin/
 ```

### Restart node and check logs
```js
sudo systemctl restart junctiond && sudo journalctl -u junctiond -f --no-hostname -o cat
```