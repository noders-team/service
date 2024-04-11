---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-bitsong">
# Installation
</div>
###### Chain ID: `bitsong-2b` | Current Node Version: `v0.15.0`

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
### Clone BitSong repo and build bitsongd v0.15.0
```js
cd $HOME
git clone https://github.com/bitsongofficial.git
cd bitsongofficial
git checkout v0.15.0
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.bitsongd/cosmovisor/upgrades/v0.15.0/bin
mv $HOME/go/bin/bitsongd ~/.bitsongd/cosmovisor/upgrades/v0.15.0/bin/
```

### Create symlinks
```js
sudo ln -s ~/.bitsongd/cosmovisor/genesis ~/.bitsongd/cosmovisor/current -f
sudo ln -s ~/.bitsongd/cosmovisor/current/bin/bitsongd /usr/local/bin/bitsongd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/bitsongd.service > /dev/null << EOF
[Unit]
Description=bitsong node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.bitsongd"
Environment="DAEMON_NAME=bitsongd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.bitsongd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone BitSong repo and build bitsongd v0.15.0
```js
cd $HOME
git clone https://github.com/bitsongofficial.git
cd bitsongofficial
git checkout v0.15.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/bitsongd.service > /dev/null << EOF
[Unit]
Description=bitsong node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which bitsongd) start
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
sudo systemctl enable bitsongd
```

## Node configuration
### Set config
```js
bitsongd config chain-id bitsong-2b
bitsongd config keyring-backend os
bitsongd config node tcp://localhost:26657
```

### Initialize the node
```js
bitsongd init NAME_OF_YOUR_VALIDATOR --chain-id bitsong-2b
```

### Download genesis and addrbook
```js
curl https://config.noders.services/bitsong/genesis.json -o ~/.bitsongd/config/genesis.json
curl https://config.noders.services/bitsong/addrbook.json -o ~/.bitsongd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"b347b47a650981b2e12782e92cf26ba8aa0148c9@bitsong-rpc.noders.services:20656\"/" ~/.bitsongd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ubtsg\"|" ~/.bitsongd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.bitsongd/config/app.toml
```

### Set custom ports

```bash
echo "export bitsongd_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${bitsongd_PORT}317%g" \
-e "s%:8080%:${bitsongd_PORT}080%g" \
-e "s%:9090%:${bitsongd_PORT}090%g" \
-e "s%:9091%:${bitsongd_PORT}091%g" \
-e "s%:8545%:${bitsongd_PORT}545%g" \
-e "s%:8546%:${bitsongd_PORT}546%g" \
-e "s%:6065%:${bitsongd_PORT}065%g" ~/.bitsongd/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${bitsongd_PORT}657%g" \
-e "s%:6060%:${bitsongd_PORT}060%g" \
-e "s%:26656%:${bitsongd_PORT}656%g" \
-e "s%:26660%:${bitsongd_PORT}660%g" ~/.bitsongd/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start bitsongd && sudo journalctl -u bitsongd -f --no-hostname -o cat
```
