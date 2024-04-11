---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-alignedlayer">
# Installation
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `v0.1.0`

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
### Clone Alignedlayer repo and build alignedlayerd v0.1.0
```js
cd $HOME
git clone https://github.com/yetanotherco/aligned_layer.git
cd aligned_layer
git checkout v0.1.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.alignedlayer/cosmovisor/upgrades/v0.1.0/bin
mv $HOME/go/bin/alignedlayerd ~/.alignedlayer/cosmovisor/upgrades/v0.1.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.alignedlayer/cosmovisor/genesis ~/.alignedlayer/cosmovisor/current -f
sudo ln -s ~/.alignedlayer/cosmovisor/current/bin/alignedlayerd /usr/local/bin/alignedlayerd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/alignedlayerd.service > /dev/null << EOF
[Unit]
Description=alignedlayer node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.alignedlayer"
Environment="DAEMON_NAME=alignedlayerd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.alignedlayer/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Alignedlayer repo and build alignedlayerd v0.1.0
```js
cd $HOME
git clone https://github.com/yetanotherco/aligned_layer.git
cd aligned_layer
git checkout v0.1.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/alignedlayerd.service > /dev/null << EOF
[Unit]
Description=alignedlayer node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which alignedlayerd) start
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
sudo systemctl enable alignedlayerd
```

## Node configuration
### Set config
```js
alignedlayerd config chain-id alignedlayer
alignedlayerd config keyring-backend os
alignedlayerd config node tcp://localhost:26657
```

### Initialize the node
```js
alignedlayerd init NAME_OF_YOUR_VALIDATOR --chain-id alignedlayer
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/alignedlayer/genesis.json -o ~/.alignedlayer/config/genesis.json
curl https://config-t.noders.services/alignedlayer/addrbook.json -o ~/.alignedlayer/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"b5da413b7882dc42172818914f55e661fcb88981@aligned-t-rpc.noders.services:27656\"/" ~/.alignedlayer/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001stake\"|" ~/.alignedlayer/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.alignedlayer/config/app.toml
```

### Set custom ports

```bash
echo "export alignedlayerd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${alignedlayerd_PORT}317%g" \
-e "s%:8080%:${alignedlayerd_PORT}080%g" \
-e "s%:9090%:${alignedlayerd_PORT}090%g" \
-e "s%:9091%:${alignedlayerd_PORT}091%g" \
-e "s%:8545%:${alignedlayerd_PORT}545%g" \
-e "s%:8546%:${alignedlayerd_PORT}546%g" \
-e "s%:6065%:${alignedlayerd_PORT}065%g" ~/.alignedlayer/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${alignedlayerd_PORT}657%g" \
-e "s%:6060%:${alignedlayerd_PORT}060%g" \
-e "s%:26656%:${alignedlayerd_PORT}656%g" \
-e "s%:26660%:${alignedlayerd_PORT}660%g" ~/.alignedlayer/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start alignedlayerd && sudo journalctl -u alignedlayerd -f --no-hostname -o cat
```
