---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-celestia">
# Installation
</div>
###### Chain ID: `celestia` | Current Node Version: `v1.9.0`

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
### Clone Celestia repo and build celestia-appd v1.9.0
```js
cd $HOME
git clone https://github.com/celestiaorg.git
cd celestiaorg
git checkout v1.9.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.celestia-app/cosmovisor/upgrades/v1.9.0/bin
mv $HOME/go/bin/celestia-appd ~/.celestia-app/cosmovisor/upgrades/v1.9.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.celestia-app/cosmovisor/genesis ~/.celestia-app/cosmovisor/current -f
sudo ln -s ~/.celestia-app/cosmovisor/current/bin/celestia-appd /usr/local/bin/celestia-appd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/celestia-appd.service > /dev/null << EOF
[Unit]
Description=celestia node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.celestia-app"
Environment="DAEMON_NAME=celestia-appd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.celestia-app/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Celestia repo and build celestia-appd v1.9.0
```js
cd $HOME
git clone https://github.com/celestiaorg.git
cd celestiaorg
git checkout v1.9.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/celestia-appd.service > /dev/null << EOF
[Unit]
Description=celestia node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia-appd) start
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
sudo systemctl enable celestia-appd
```

## Node configuration
### Set config
```js
celestia-appd config chain-id celestia
celestia-appd config keyring-backend os
celestia-appd config node tcp://localhost:26657
```

### Initialize the node
```js
celestia-appd init NAME_OF_YOUR_VALIDATOR --chain-id celestia
```

### Download genesis and addrbook
```js
curl https://config.noders.services/celestia/genesis.json -o ~/.celestia-app/config/genesis.json
curl https://config.noders.services/celestia/addrbook.json -o ~/.celestia-app/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"27f6bac8492b1597146b6c4aeddc4d328fa8ac28@celestia-rpc.noders.services:11656\"/" ~/.celestia-app/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001utia\"|" ~/.celestia-app/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.celestia-app/config/app.toml
```

### Set custom ports

```bash
echo "export celestia-appd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${celestia-appd_PORT}317%g" \
-e "s%:8080%:${celestia-appd_PORT}080%g" \
-e "s%:9090%:${celestia-appd_PORT}090%g" \
-e "s%:9091%:${celestia-appd_PORT}091%g" \
-e "s%:8545%:${celestia-appd_PORT}545%g" \
-e "s%:8546%:${celestia-appd_PORT}546%g" \
-e "s%:6065%:${celestia-appd_PORT}065%g" ~/.celestia-app/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${celestia-appd_PORT}658%g" \
-e "s%:26657%:${celestia-appd_PORT}657%g" \
-e "s%:6060%:${celestia-appd_PORT}060%g" \
-e "s%:26656%:${celestia-appd_PORT}656%g" \
-e "s%:26660%:${celestia-appd_PORT}660%g" ~/.celestia-app/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start celestia-appd && sudo journalctl -u celestia-appd -f --no-hostname -o cat
```
## Install Bridge Node

# Official documentation: https://docs.celestia.org/nodes/bridge-node

## Download and build binaries
```js
cd $HOME
rm -rf celestia-node
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node
git checkout v0.13.7
make build
sudo mv build/celestia /usr/local/bin
make cel-key
sudo mv cel-key /usr/local/bin
```

## Add Bridge wallet
### GENERATE NEW WALLET
```js
cel-key add bridge-wallet --node.type bridge --p2p.network celestia
```

### RECOVER EXISTING WALLET
```js
cel-key add bridge-wallet --node.type bridge --p2p.network celestia --recover
```

## Fund the wallet with testnet tokens
Once you start the Bridge Node, a wallet key will be generated for you. You will need to fund that address with Testnet tokens to pay for PayForBlob transactions

## Initialize Bridge node

```js
celestia bridge init \
  --keyring.accname bridge-wallet \
  --core.ip <PUBLIC OR YOUR NODE IP> \
  --core.rpc.port <PORT> \
  --core.grpc.port <PORT> \
  --p2p.network celestia \
  --rpc.port <PORT> \
  --gateway.port <PORT>
```

## Create service

```js
sudo tee /etc/systemd/system/celestia-bridge.service > /dev/null << EOF
[Unit]
Description=Celestia Bridge Node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) bridge start \
--keyring.accname bridge-wallet \
--core.ip <PUBLIC OR YOUR NODE IP> \
--core.rpc.port <PORT> \
--core.grpc.port <PORT> \
--p2p.network celestia \
--rpc.port <PORT> \
--gateway.port <PORT> \
--metrics.tls=true \
--metrics \
--metrics.endpoint otel.celestia.observer 
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable celestia-bridge.service
```

## Start Bridge node
```js
systemctl restart celestia-bridge.service
```

## Check Bridge node logs
```js
journalctl -fu celestia-bridge.service -o cat
```

## Useful commands
`Get Bridge Node ID`
```js
AUTH_TOKEN=$(celestia bridge auth admin --p2p.network celestia)
curl -s -X POST -H "Authorization: Bearer $AUTH_TOKEN" -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' http://localhost:12058 | jq -r .result.ID
```

## Get Bridge node key
```js
cel-key show bridge-wallet --node.type bridge --p2p.network celestia -a | tail -1
```

## Check Bridge node wallet balance
```js
celestia-appd q bank balances $(cel-key show bridge-wallet --node.type bridge --p2p.network celestia -a | tail -1)
```