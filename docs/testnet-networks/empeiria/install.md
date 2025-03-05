---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-empeiria">
# Installation
</div>
###### Chain ID: `empe-testnet-2` | Current Node Version: `v0.3.0`

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
### Clone Empeiria repo and build emped v0.3.0
```js
cd $HOME
git clone https://github.com/empe-io.git
cd empe-io
git checkout v0.3.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.empe-chain/cosmovisor/upgrades/v0.3.0/bin
mv $HOME/go/bin/emped ~/.empe-chain/cosmovisor/upgrades/v0.3.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.empe-chain/cosmovisor/genesis ~/.empe-chain/cosmovisor/current -f
sudo ln -s ~/.empe-chain/cosmovisor/current/bin/emped /usr/local/bin/emped -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/emped.service > /dev/null << EOF
[Unit]
Description=empeiria node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.empe-chain"
Environment="DAEMON_NAME=emped"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.empe-chain/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Empeiria repo and build emped v0.3.0
```js
cd $HOME
git clone https://github.com/empe-io.git
cd empe-io
git checkout v0.3.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/emped.service > /dev/null << EOF
[Unit]
Description=empeiria node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which emped) start
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
sudo systemctl enable emped
```

## Node configuration
### Set config
```js
emped config chain-id empe-testnet-2
emped config keyring-backend os
emped config node tcp://localhost:26657
```

### Initialize the node
```js
emped init NAME_OF_YOUR_VALIDATOR --chain-id empe-testnet-2
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/empeiria/genesis.json -o ~/.empe-chain/config/genesis.json
curl https://config-t.noders.services/empeiria/addrbook.json -o ~/.empe-chain/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"5fc98f2ec4b2a6001aa5655c9852d259e83a8e74@empeiria-t-rpc.noders.services:11256\"/" ~/.empe-chain/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uempe\"|" ~/.empe-chain/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.empe-chain/config/app.toml
```

### Set custom ports

```bash
echo "export emped_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${emped_PORT}317%g" \
-e "s%:8080%:${emped_PORT}080%g" \
-e "s%:9090%:${emped_PORT}090%g" \
-e "s%:9091%:${emped_PORT}091%g" \
-e "s%:8545%:${emped_PORT}545%g" \
-e "s%:8546%:${emped_PORT}546%g" \
-e "s%:6065%:${emped_PORT}065%g" ~/.empe-chain/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${emped_PORT}658%g" \
-e "s%:26657%:${emped_PORT}657%g" \
-e "s%:6060%:${emped_PORT}060%g" \
-e "s%:26656%:${emped_PORT}656%g" \
-e "s%:26660%:${emped_PORT}660%g" ~/.empe-chain/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start emped && sudo journalctl -u emped -f --no-hostname -o cat
```