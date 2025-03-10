---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-warden">
# Installation
</div>
###### Chain ID: `chiado_10010-1` | Current Node Version: `v0.6.2`

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
### Clone Warden repo and build wardend v0.6.2
```js
cd $HOME
git clone https://github.com/warden-protocol/wardenprotocol.git
cd wardenprotocol
git checkout v0.6.2
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.warden/cosmovisor/upgrades/v0.6.2/bin
mv $HOME/go/bin/wardend ~/.warden/cosmovisor/upgrades/v0.6.2/bin/
```

### Create symlinks
```js
sudo ln -s ~/.warden/cosmovisor/genesis ~/.warden/cosmovisor/current -f
sudo ln -s ~/.warden/cosmovisor/current/bin/wardend /usr/local/bin/wardend -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/wardend.service > /dev/null << EOF
[Unit]
Description=warden node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.warden"
Environment="DAEMON_NAME=wardend"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.warden/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Warden repo and build wardend v0.6.2
```js
cd $HOME
git clone https://github.com/warden-protocol/wardenprotocol.git
cd wardenprotocol
git checkout v0.6.2
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/wardend.service > /dev/null << EOF
[Unit]
Description=warden node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which wardend) start
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
sudo systemctl enable wardend
```

## Node configuration
### Set config
```js
wardend config chain-id chiado_10010-1
wardend config keyring-backend os
wardend config node tcp://localhost:26657
```

### Initialize the node
```js
wardend init NAME_OF_YOUR_VALIDATOR --chain-id chiado_10010-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/warden/genesis.json -o ~/.warden/config/genesis.json
curl https://config-t.noders.services/warden/addrbook.json -o ~/.warden/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"d5b7f132587c4bbfb1b024e37fd5989130756f69@warden-t-rpc.noders.services:27356\"/" ~/.warden/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uward\"|" ~/.warden/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.warden/config/app.toml
```

### Set custom ports

```bash
echo "export wardend_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${wardend_PORT}317%g" \
-e "s%:8080%:${wardend_PORT}080%g" \
-e "s%:9090%:${wardend_PORT}090%g" \
-e "s%:9091%:${wardend_PORT}091%g" \
-e "s%:8545%:${wardend_PORT}545%g" \
-e "s%:8546%:${wardend_PORT}546%g" \
-e "s%:6065%:${wardend_PORT}065%g" ~/.warden/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${wardend_PORT}658%g" \
-e "s%:26657%:${wardend_PORT}657%g" \
-e "s%:6060%:${wardend_PORT}060%g" \
-e "s%:26656%:${wardend_PORT}656%g" \
-e "s%:26660%:${wardend_PORT}660%g" ~/.warden/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start wardend && sudo journalctl -u wardend -f --no-hostname -o cat
```