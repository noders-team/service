---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-side">
# Installation
</div>
###### Chain ID: `S2-testnet-2` | Current Node Version: `v0.8.1`

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
### Clone Side repo and build sided v0.8.1
```js
cd $HOME
git clone https://github.com/sideprotocol.git
cd sideprotocol
git checkout v0.8.1
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.side/cosmovisor/upgrades/v0.8.1/bin
mv $HOME/go/bin/sided ~/.side/cosmovisor/upgrades/v0.8.1/bin/
```

### Create symlinks
```js
sudo ln -s ~/.side/cosmovisor/genesis ~/.side/cosmovisor/current -f
sudo ln -s ~/.side/cosmovisor/current/bin/sided /usr/local/bin/sided -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/sided.service > /dev/null << EOF
[Unit]
Description=side node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.side"
Environment="DAEMON_NAME=sided"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.side/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Side repo and build sided v0.8.1
```js
cd $HOME
git clone https://github.com/sideprotocol.git
cd sideprotocol
git checkout v0.8.1
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/sided.service > /dev/null << EOF
[Unit]
Description=side node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which sided) start
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
sudo systemctl enable sided
```

## Node configuration
### Set config
```js
sided config chain-id S2-testnet-2
sided config keyring-backend os
sided config node tcp://localhost:26657
```

### Initialize the node
```js
sided init NAME_OF_YOUR_VALIDATOR --chain-id S2-testnet-2
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/side/genesis.json -o ~/.side/config/genesis.json
curl https://config-t.noders.services/side/addrbook.json -o ~/.side/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"4a02056469cdfd852fe736719b56ae22e84d729e@side-t-rpc.noders.services:26656\"/" ~/.side/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uside\"|" ~/.side/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.side/config/app.toml
```

### Set custom ports

```bash
echo "export sided_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${sided_PORT}317%g" \
-e "s%:8080%:${sided_PORT}080%g" \
-e "s%:9090%:${sided_PORT}090%g" \
-e "s%:9091%:${sided_PORT}091%g" \
-e "s%:8545%:${sided_PORT}545%g" \
-e "s%:8546%:${sided_PORT}546%g" \
-e "s%:6065%:${sided_PORT}065%g" ~/.side/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${sided_PORT}658%g" \
-e "s%:26657%:${sided_PORT}657%g" \
-e "s%:6060%:${sided_PORT}060%g" \
-e "s%:26656%:${sided_PORT}656%g" \
-e "s%:26660%:${sided_PORT}660%g" ~/.side/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start sided && sudo journalctl -u sided -f --no-hostname -o cat
```
