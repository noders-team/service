---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-union">
# Installation
</div>
###### Chain ID: `union-testnet-6` | Current Node Version: `vnull`

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
### Clone Union repo and build uniond vnull
```js
cd $HOME
git clone https://github.com/unionlabs.git
cd unionlabs
git checkout vnull
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.union/cosmovisor/upgrades/vnull/bin
mv $HOME/go/bin/uniond ~/.union/cosmovisor/upgrades/vnull/bin/
```

### Create symlinks
```js
sudo ln -s ~/.union/cosmovisor/genesis ~/.union/cosmovisor/current -f
sudo ln -s ~/.union/cosmovisor/current/bin/uniond /usr/local/bin/uniond -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/uniond.service > /dev/null << EOF
[Unit]
Description=union node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.union"
Environment="DAEMON_NAME=uniond"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.union/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Union repo and build uniond vnull
```js
cd $HOME
git clone https://github.com/unionlabs.git
cd unionlabs
git checkout vnull
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/uniond.service > /dev/null << EOF
[Unit]
Description=union node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which uniond) start
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
sudo systemctl enable uniond
```

## Node configuration
### Set config
```js
uniond config chain-id union-testnet-6
uniond config keyring-backend os
uniond config node tcp://localhost:26657
```

### Initialize the node
```js
uniond init NAME_OF_YOUR_VALIDATOR --chain-id union-testnet-6
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/union/genesis.json -o ~/.union/config/genesis.json
curl https://config-t.noders.services/union/addrbook.json -o ~/.union/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"d9967a42d574c59a66af1a25dade03af6a41b979@union-t-rpc.noders.services:11656\"/" ~/.union/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001muno\"|" ~/.union/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.union/config/app.toml
```

### Set custom ports

```bash
echo "export uniond_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${uniond_PORT}317%g" \
-e "s%:8080%:${uniond_PORT}080%g" \
-e "s%:9090%:${uniond_PORT}090%g" \
-e "s%:9091%:${uniond_PORT}091%g" \
-e "s%:8545%:${uniond_PORT}545%g" \
-e "s%:8546%:${uniond_PORT}546%g" \
-e "s%:6065%:${uniond_PORT}065%g" ~/.union/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${uniond_PORT}657%g" \
-e "s%:6060%:${uniond_PORT}060%g" \
-e "s%:26656%:${uniond_PORT}656%g" \
-e "s%:26660%:${uniond_PORT}660%g" ~/.union/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start uniond && sudo journalctl -u uniond -f --no-hostname -o cat
```
