---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-xrp">
# Installation
</div>
###### Chain ID: `exrp_1440002-1` | Current Node Version: `v6.0.0`

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
### Clone XRPL EVM repo and build exrpd v6.0.0
```js
cd $HOME
git clone https://github.com/xrplevm/node.git
cd node
git checkout v6.0.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.exrpd/cosmovisor/upgrades/v6.0.0/bin
mv $HOME/go/bin/exrpd ~/.exrpd/cosmovisor/upgrades/v6.0.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.exrpd/cosmovisor/genesis ~/.exrpd/cosmovisor/current -f
sudo ln -s ~/.exrpd/cosmovisor/current/bin/exrpd /usr/local/bin/exrpd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/exrpd.service > /dev/null << EOF
[Unit]
Description=xrp node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.exrpd"
Environment="DAEMON_NAME=exrpd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.exrpd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone XRPL EVM repo and build exrpd v6.0.0
```js
cd $HOME
git clone https://github.com/xrplevm/node.git
cd node
git checkout v6.0.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/exrpd.service > /dev/null << EOF
[Unit]
Description=xrp node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which exrpd) start
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
sudo systemctl enable exrpd
```

## Node configuration
### Set config
```js
exrpd config chain-id exrp_1440002-1
exrpd config keyring-backend os
exrpd config node tcp://localhost:26657
```

### Initialize the node
```js
exrpd init NAME_OF_YOUR_VALIDATOR --chain-id exrp_1440002-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/xrp/genesis.json -o ~/.exrpd/config/genesis.json
curl https://config-t.noders.services/xrp/addrbook.json -o ~/.exrpd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"6dce0cbcef3fc253a5a3bdaf22985163586175c9@xrp-t-rpc.noders.services:37956\"/" ~/.exrpd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001apoa\"|" ~/.exrpd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.exrpd/config/app.toml
```

### Set custom ports

```bash
echo "export exrpd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${exrpd_PORT}317%g" \
-e "s%:8080%:${exrpd_PORT}080%g" \
-e "s%:9090%:${exrpd_PORT}090%g" \
-e "s%:9091%:${exrpd_PORT}091%g" \
-e "s%:8545%:${exrpd_PORT}545%g" \
-e "s%:8546%:${exrpd_PORT}546%g" \
-e "s%:6065%:${exrpd_PORT}065%g" ~/.exrpd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${exrpd_PORT}658%g" \
-e "s%:26657%:${exrpd_PORT}657%g" \
-e "s%:6060%:${exrpd_PORT}060%g" \
-e "s%:26656%:${exrpd_PORT}656%g" \
-e "s%:26660%:${exrpd_PORT}660%g" ~/.exrpd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start exrpd && sudo journalctl -u exrpd -f --no-hostname -o cat
```