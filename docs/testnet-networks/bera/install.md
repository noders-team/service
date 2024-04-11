---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-bera">
# Installation
</div>
###### Chain ID: `artio-80085` | Current Node Version: `v0.2.3-alpha-rc7`

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
### Clone Bera repo and build berad v0.2.3-alpha-rc7
```js
cd $HOME
git clone https://github.com/berachain.git
cd berachain
git checkout v0.2.3-alpha-rc7
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.bera/cosmovisor/upgrades/v0.2.3-alpha-rc7/bin
mv $HOME/go/bin/berad ~/.bera/cosmovisor/upgrades/v0.2.3-alpha-rc7/bin/
```

### Create symlinks
```js
sudo ln -s ~/.bera/cosmovisor/genesis ~/.bera/cosmovisor/current -f
sudo ln -s ~/.bera/cosmovisor/current/bin/berad /usr/local/bin/berad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/berad.service > /dev/null << EOF
[Unit]
Description=bera node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.bera"
Environment="DAEMON_NAME=berad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.bera/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Bera repo and build berad v0.2.3-alpha-rc7
```js
cd $HOME
git clone https://github.com/berachain.git
cd berachain
git checkout v0.2.3-alpha-rc7
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/berad.service > /dev/null << EOF
[Unit]
Description=bera node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which berad) start
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
sudo systemctl enable berad
```

## Node configuration
### Set config
```js
berad config chain-id artio-80085
berad config keyring-backend os
berad config node tcp://localhost:26657
```

### Initialize the node
```js
berad init NAME_OF_YOUR_VALIDATOR --chain-id artio-80085
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/bera/genesis.json -o ~/.bera/config/genesis.json
curl https://config-t.noders.services/bera/addrbook.json -o ~/.bera/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"f4f9dd773bad1363cbc85ce7534bfd172c2d83b4@berachain-t-rpc.noders.services:16656\"/" ~/.bera/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uabgt\"|" ~/.bera/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.bera/config/app.toml
```

### Set custom ports

```bash
echo "export berad_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${berad_PORT}317%g" \
-e "s%:8080%:${berad_PORT}080%g" \
-e "s%:9090%:${berad_PORT}090%g" \
-e "s%:9091%:${berad_PORT}091%g" \
-e "s%:8545%:${berad_PORT}545%g" \
-e "s%:8546%:${berad_PORT}546%g" \
-e "s%:6065%:${berad_PORT}065%g" ~/.bera/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${berad_PORT}657%g" \
-e "s%:6060%:${berad_PORT}060%g" \
-e "s%:26656%:${berad_PORT}656%g" \
-e "s%:26660%:${berad_PORT}660%g" ~/.bera/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start berad && sudo journalctl -u berad -f --no-hostname -o cat
```
