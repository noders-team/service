---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-lava">
# Installation
</div>
###### Chain ID: `lava-testnet-2` | Current Node Version: `v2.0.0`

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
### Clone Lava repo and build lavad v2.0.0
```js
cd $HOME
git clone https://github.com/lavanet.git
cd lavanet
git checkout v2.0.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.lava/cosmovisor/upgrades/v2.0.0/bin
mv $HOME/go/bin/lavad ~/.lava/cosmovisor/upgrades/v2.0.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.lava/cosmovisor/genesis ~/.lava/cosmovisor/current -f
sudo ln -s ~/.lava/cosmovisor/current/bin/lavad /usr/local/bin/lavad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/lavad.service > /dev/null << EOF
[Unit]
Description=lava node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.lava"
Environment="DAEMON_NAME=lavad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.lava/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Lava repo and build lavad v2.0.0
```js
cd $HOME
git clone https://github.com/lavanet.git
cd lavanet
git checkout v2.0.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/lavad.service > /dev/null << EOF
[Unit]
Description=lava node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which lavad) start
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
sudo systemctl enable lavad
```

## Node configuration
### Set config
```js
lavad config chain-id lava-testnet-2
lavad config keyring-backend os
lavad config node tcp://localhost:26657
```

### Initialize the node
```js
lavad init NAME_OF_YOUR_VALIDATOR --chain-id lava-testnet-2
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/lava/genesis.json -o ~/.lava/config/genesis.json
curl https://config-t.noders.services/lava/addrbook.json -o ~/.lava/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"e33ea4c7611bfee8160ad577890a9ae158a9a3ac@lava-t-rpc.noders.services:19656\"/" ~/.lava/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ulava\"|" ~/.lava/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.lava/config/app.toml
```

### Set custom ports

```bash
echo "export lavad_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${lavad_PORT}317%g" \
-e "s%:8080%:${lavad_PORT}080%g" \
-e "s%:9090%:${lavad_PORT}090%g" \
-e "s%:9091%:${lavad_PORT}091%g" \
-e "s%:8545%:${lavad_PORT}545%g" \
-e "s%:8546%:${lavad_PORT}546%g" \
-e "s%:6065%:${lavad_PORT}065%g" ~/.lava/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${lavad_PORT}658%g" \
-e "s%:26657%:${lavad_PORT}657%g" \
-e "s%:6060%:${lavad_PORT}060%g" \
-e "s%:26656%:${lavad_PORT}656%g" \
-e "s%:26660%:${lavad_PORT}660%g" ~/.lava/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start lavad && sudo journalctl -u lavad -f --no-hostname -o cat
```