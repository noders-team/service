---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-pylons">
# Installation
</div>
###### Chain ID: `pylons-mainnet-1` | Current Node Version: `v1.1.4`

## Install dependencies

```js
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```

## Install GO
```js
ver="1.21.3" &&
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" &&
sudo rm -rf /usr/local/go &&
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" &&
rm "go$ver.linux-amd64.tar.gz" &&
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile &&
source $HOME/.bash_profile &&
go version
```

## Install with Cosmovisor
:::note ADVANCED ROUTE

Cosmosvisor is a process manager for Cosmos SDK application binaries that monitors the governance module for incoming chain upgrade proposals. If a proposal is approved, cosmosvisor can automatically download the new binary, stop the current one, switch to the new binary, and restart the node with the new binary.

:::
### Download and build binaries
### Clone Pylons repo and build pylonsd v1.1.4
```js
cd $HOME
git clone https://github.com/Pylons-tech/pylons.git
cd pylons
git checkout v1.1.4
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.pylonsd/cosmovisor/upgrades/v1.1.4/bin
mv $HOME/go/bin/pylonsd ~/.pylonsd/cosmovisor/upgrades/v1.1.4/bin/
```

### Create symlinks
```js
sudo ln -s ~/.pylonsd/cosmovisor/genesis ~/.pylonsd/cosmovisor/current -f
sudo ln -s ~/.pylonsd/cosmovisor/current/bin/pylonsd /usr/local/bin/pylonsd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/pylonsd.service > /dev/null << EOF
[Unit]
Description=pylons node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.pylonsd"
Environment="DAEMON_NAME=pylonsd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.pylonsd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Pylons repo and build pylonsd v1.1.4
```js
cd $HOME
git clone https://github.com/Pylons-tech/pylons.git
cd pylons
git checkout v1.1.4
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/pylonsd.service > /dev/null << EOF
[Unit]
Description=pylons node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which pylonsd) start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable pylonsd
```

## Node configuration
### Set config
```js
pylonsd config chain-id pylons-mainnet-1
pylonsd config keyring-backend os
pylonsd config node tcp://localhost:26657
```

### Initialize the node
```js
pylonsd init NAME_OF_YOUR_VALIDATOR --chain-id pylons-mainnet-1
```

### Download genesis and addrbook
```js
curl https://config.noders.services/pylons/genesis.json -o ~/.pylonsd/config/genesis.json
curl https://config.noders.services/pylons/addrbook.json -o ~/.pylonsd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"ae94eb20e73c0ad93dbb980338eb313320c56194@pylons-rpc.noders.services:23656\"/" ~/.pylonsd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ubedrock\"|" ~/.pylonsd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.pylonsd/config/app.toml
```

### Set custom ports

```bash
echo "export pylonsd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${pylonsd_PORT}317%g" \
-e "s%:8080%:${pylonsd_PORT}080%g" \
-e "s%:9090%:${pylonsd_PORT}090%g" \
-e "s%:9091%:${pylonsd_PORT}091%g" \
-e "s%:8545%:${pylonsd_PORT}545%g" \
-e "s%:8546%:${pylonsd_PORT}546%g" \
-e "s%:6065%:${pylonsd_PORT}065%g" ~/.pylonsd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${pylonsd_PORT}658%g" \
-e "s%:26657%:${pylonsd_PORT}657%g" \
-e "s%:6060%:${pylonsd_PORT}060%g" \
-e "s%:26656%:${pylonsd_PORT}656%g" \
-e "s%:26660%:${pylonsd_PORT}660%g" ~/.pylonsd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start pylonsd && sudo journalctl -u pylonsd -f --no-hostname -o cat
```
