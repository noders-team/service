---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-band">
# Installation
</div>
###### Chain ID: `laozi-mainnet` | Current Node Version: `v2.5.4`

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
### Clone Band repo and build bandd v2.5.4
```js
cd $HOME
git clone https://github.com/bandprotocol/chain.git
cd chain
git checkout v2.5.4
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.band/cosmovisor/upgrades/v2.5.4/bin
mv $HOME/go/bin/bandd ~/.band/cosmovisor/upgrades/v2.5.4/bin/
```

### Create symlinks
```js
sudo ln -s ~/.band/cosmovisor/genesis ~/.band/cosmovisor/current -f
sudo ln -s ~/.band/cosmovisor/current/bin/bandd /usr/local/bin/bandd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/bandd.service > /dev/null << EOF
[Unit]
Description=band node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.band"
Environment="DAEMON_NAME=bandd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.band/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Band repo and build bandd v2.5.4
```js
cd $HOME
git clone https://github.com/bandprotocol/chain.git
cd chain
git checkout v2.5.4
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/bandd.service > /dev/null << EOF
[Unit]
Description=band node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which bandd) start
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
sudo systemctl enable bandd
```

## Node configuration
### Set config
```js
bandd config chain-id laozi-mainnet
bandd config keyring-backend os
bandd config node tcp://localhost:26657
```

### Initialize the node
```js
bandd init NAME_OF_YOUR_VALIDATOR --chain-id laozi-mainnet
```

### Download genesis and addrbook
```js
curl https://config.noders.services/band/genesis.json -o ~/.band/config/genesis.json
curl https://config.noders.services/band/addrbook.json -o ~/.band/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"9bb1dc1d54ad290b7b17960bb0313dfd14426b68@band-rpc.noders.services:30656\"/" ~/.band/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uband\"|" ~/.band/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.band/config/app.toml
```

### Set custom ports

```bash
echo "export bandd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${bandd_PORT}317%g" \
-e "s%:8080%:${bandd_PORT}080%g" \
-e "s%:9090%:${bandd_PORT}090%g" \
-e "s%:9091%:${bandd_PORT}091%g" \
-e "s%:8545%:${bandd_PORT}545%g" \
-e "s%:8546%:${bandd_PORT}546%g" \
-e "s%:6065%:${bandd_PORT}065%g" ~/.band/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${bandd_PORT}657%g" \
-e "s%:6060%:${bandd_PORT}060%g" \
-e "s%:26656%:${bandd_PORT}656%g" \
-e "s%:26660%:${bandd_PORT}660%g" ~/.band/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start bandd && sudo journalctl -u bandd -f --no-hostname -o cat
```
