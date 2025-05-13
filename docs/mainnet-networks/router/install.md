---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-router">
# Installation
</div>
###### Chain ID: `router_9600-1` | Current Node Version: `v1.6.0`

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
### Clone Router repo and build routerd v1.6.0
```js
cd $HOME
git clone https://github.com/router-protocol.git
cd router-protocol
git checkout v1.6.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.routerd/cosmovisor/upgrades/v1.6.0/bin
mv $HOME/go/bin/routerd ~/.routerd/cosmovisor/upgrades/v1.6.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.routerd/cosmovisor/genesis ~/.routerd/cosmovisor/current -f
sudo ln -s ~/.routerd/cosmovisor/current/bin/routerd /usr/local/bin/routerd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/routerd.service > /dev/null << EOF
[Unit]
Description=router node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.routerd"
Environment="DAEMON_NAME=routerd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.routerd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Router repo and build routerd v1.6.0
```js
cd $HOME
git clone https://github.com/router-protocol.git
cd router-protocol
git checkout v1.6.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/routerd.service > /dev/null << EOF
[Unit]
Description=router node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which routerd) start
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
sudo systemctl enable routerd
```

## Node configuration
### Set config
```js
routerd config chain-id router_9600-1
routerd config keyring-backend os
routerd config node tcp://localhost:26657
```

### Initialize the node
```js
routerd init NAME_OF_YOUR_VALIDATOR --chain-id router_9600-1
```

### Download genesis and addrbook
```js
curl https://snapshots.noders.services/router/genesis.json -o ~/.routerd/config/genesis.json
curl https://snapshots.noders.services/router/addrbook.json -o ~/.routerd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"7406480265ca3f45cce81737abd245f3d3e6a8bb@router-rpc.noders.services:23756\"/" ~/.routerd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001route\"|" ~/.routerd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.routerd/config/app.toml
```

### Set custom ports

```bash
echo "export routerd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${routerd_PORT}317%g" \
-e "s%:8080%:${routerd_PORT}080%g" \
-e "s%:9090%:${routerd_PORT}090%g" \
-e "s%:9091%:${routerd_PORT}091%g" \
-e "s%:8545%:${routerd_PORT}545%g" \
-e "s%:8546%:${routerd_PORT}546%g" \
-e "s%:6065%:${routerd_PORT}065%g" ~/.routerd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${routerd_PORT}658%g" \
-e "s%:26657%:${routerd_PORT}657%g" \
-e "s%:6060%:${routerd_PORT}060%g" \
-e "s%:26656%:${routerd_PORT}656%g" \
-e "s%:26660%:${routerd_PORT}660%g" ~/.routerd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start routerd && sudo journalctl -u routerd -f --no-hostname -o cat
```
