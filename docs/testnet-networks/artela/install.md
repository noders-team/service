---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-artela">
# Installation
</div>
###### Chain ID: `artela_11822-1` | Current Node Version: `v0.4.7-rc6`

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
### Clone Artela repo and build artelad v0.4.7-rc6
```js
cd $HOME
git clone https://github.com/artela-network.git
cd artela-network
git checkout v0.4.7-rc6
```

### Build binaries
```js
make install
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.artelad/cosmovisor/upgrades/v0.4.7-rc6/bin
mv $HOME/go/bin/artelad ~/.artelad/cosmovisor/upgrades/v0.4.7-rc6/bin/
```

### Create symlinks
```js
sudo ln -s ~/.artelad/cosmovisor/genesis ~/.artelad/cosmovisor/current -f
sudo ln -s ~/.artelad/cosmovisor/current/bin/artelad /usr/local/bin/artelad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/artelad.service > /dev/null << EOF
[Unit]
Description=artela node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.artelad"
Environment="DAEMON_NAME=artelad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.artelad/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Artela repo and build artelad v0.4.7-rc6
```js
cd $HOME
git clone https://github.com/artela-network.git
cd artela-network
git checkout v0.4.7-rc6
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/artelad.service > /dev/null << EOF
[Unit]
Description=artela node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which artelad) start
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
sudo systemctl enable artelad
```

## Node configuration
### Set config
```js
artelad config chain-id artela_11822-1
artelad config keyring-backend os
artelad config node tcp://localhost:26657
```

### Initialize the node
```js
artelad init NAME_OF_YOUR_VALIDATOR --chain-id artela_11822-1
```

### Download genesis and addrbook
```js
curl https://config-t.noders.services/artela/genesis.json -o ~/.artelad/config/genesis.json
curl https://config-t.noders.services/artela/addrbook.json -o ~/.artelad/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"301d46637a338c2855ede5d2a587ad1f366f3813@artela-t-rpc.noders.services:18656\"/" ~/.artelad/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uart\"|" ~/.artelad/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.artelad/config/app.toml
```

### Set custom ports

```bash
echo "export artelad_PORT="SET_YOUR_PORT"" >> $HOME/.bash_profile
```

```js
# Set custom ports in app.toml
sed -i.bak -e "s%:1317%:${artelad_PORT}317%g" \
-e "s%:8080%:${artelad_PORT}080%g" \
-e "s%:9090%:${artelad_PORT}090%g" \
-e "s%:9091%:${artelad_PORT}091%g" \
-e "s%:8545%:${artelad_PORT}545%g" \
-e "s%:8546%:${artelad_PORT}546%g" \
-e "s%:6065%:${artelad_PORT}065%g" ~/.artelad/config/app.toml

# Set custom ports in config.toml file
sed -i.bak -e "s%:26658%:${SWISS_PORT}658%g" \
-e "s%:26657%:${artelad_PORT}657%g" \
-e "s%:6060%:${artelad_PORT}060%g" \
-e "s%:26656%:${artelad_PORT}656%g" \
-e "s%:26660%:${artelad_PORT}660%g" ~/.artelad/config/config.toml
```

### Start node and check logs
```js
sudo systemctl start artelad && sudo journalctl -u artelad -f --no-hostname -o cat
```
