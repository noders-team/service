---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-osmosis">
# Installation
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v29.0.0`

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
### Clone Osmosis repo and build osmosisd v29.0.0
```js
cd $HOME
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v29.0.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.osmosisd/cosmovisor/upgrades/v29.0.0/bin
mv $HOME/go/bin/osmosisd ~/.osmosisd/cosmovisor/upgrades/v29.0.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.osmosisd/cosmovisor/genesis ~/.osmosisd/cosmovisor/current -f
sudo ln -s ~/.osmosisd/cosmovisor/current/bin/osmosisd /usr/local/bin/osmosisd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/osmosisd.service > /dev/null << EOF
[Unit]
Description=osmosis node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.osmosisd"
Environment="DAEMON_NAME=osmosisd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.osmosisd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Osmosis repo and build osmosisd v29.0.0
```js
cd $HOME
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout v29.0.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/osmosisd.service > /dev/null << EOF
[Unit]
Description=osmosis node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which osmosisd) start
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
sudo systemctl enable osmosisd
```

## Node configuration
### Set config
```js
osmosisd config chain-id osmosis-1
osmosisd config keyring-backend os
osmosisd config node tcp://localhost:26657
```

### Initialize the node
```js
osmosisd init NAME_OF_YOUR_VALIDATOR --chain-id osmosis-1
```

### Download genesis and addrbook
```js
curl https://snapshots.noders.services/osmosis/genesis.json -o ~/.osmosisd/config/genesis.json
curl https://snapshots.noders.services/osmosis/addrbook.json -o ~/.osmosisd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"0f6a353576feb940625e43fa86ab4611a348b8e2@osmosis-rpc.noders.services:12556\"/" ~/.osmosisd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uosmo\"|" ~/.osmosisd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.osmosisd/config/app.toml
```

### Set custom ports

```bash
echo "export osmosisd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${osmosisd_PORT}317%g" \
-e "s%:8080%:${osmosisd_PORT}080%g" \
-e "s%:9090%:${osmosisd_PORT}090%g" \
-e "s%:9091%:${osmosisd_PORT}091%g" \
-e "s%:8545%:${osmosisd_PORT}545%g" \
-e "s%:8546%:${osmosisd_PORT}546%g" \
-e "s%:6065%:${osmosisd_PORT}065%g" ~/.osmosisd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${osmosisd_PORT}658%g" \
-e "s%:26657%:${osmosisd_PORT}657%g" \
-e "s%:6060%:${osmosisd_PORT}060%g" \
-e "s%:26656%:${osmosisd_PORT}656%g" \
-e "s%:26660%:${osmosisd_PORT}660%g" ~/.osmosisd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start osmosisd && sudo journalctl -u osmosisd -f --no-hostname -o cat
```
