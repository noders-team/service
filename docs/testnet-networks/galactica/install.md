---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-galactica">
# Installation
</div>
###### Chain ID: `galactica_9302-1` | Current Node Version: `v0.1.2`

## Install dependencies

```js
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```

## Install GO
```js
sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.3.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)
```

## Install with Cosmovisor
:::note ADVANCED ROUTE

Cosmosvisor is a process manager for Cosmos SDK application binaries that monitors the governance module for incoming chain upgrade proposals. If a proposal is approved, cosmosvisor can automatically download the new binary, stop the current one, switch to the new binary, and restart the node with the new binary.

:::
### Download and build binaries
### Clone Galactica repo and build galacticad v0.1.2
```js
cd $HOME
git clone https://github.com/Galactica-corp/networks.git
cd networks
git checkout v0.1.2
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.galactica/cosmovisor/upgrades/v0.1.2/bin
mv build/galacticad ~/.galactica/cosmovisor/upgrades/v0.1.2/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.galactica/cosmovisor/genesis ~/.galactica/cosmovisor/current -f
sudo ln -s ~/.galactica/cosmovisor/current/bin/galacticad /usr/local/bin/galacticad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/galactica.service > /dev/null << EOF
[Unit]
Description=galactica node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.galactica"
Environment="DAEMON_NAME=galacticad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.galactica/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Galactica repo and build galacticad v0.1.2
```js
cd $HOME
git clone https://github.com/Galactica-corp/networks.git
cd networks
git checkout v0.1.2
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/galactica.service > /dev/null << EOF
[Unit]
Description=galactica node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which galacticad) start
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
sudo systemctl enable galactica.service.service
```

## Node configuration
### Set config
```js
galacticad config chain-id galactica_9302-1
galacticad config keyring-backend os
galacticad config node tcp://localhost:26657
```

### Initialize the node
```js
galacticad init NAME_OF_YOUR_VALIDATOR --chain-id galactica_9302-1
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/galactica/genesis.json > ~/.galactica/config/genesis.json
curl -Ls https://config-t.noders.services/galactica/addrbook.json > ~/.galactica/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"707af7d29be8d3fff3c4f0cdc0b8986a6a8aff63@galactica-t-rpc.noders.services:28656\"/" ~/.galactica/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001agnet\"|" ~/.galactica/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.galactica/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.galactica/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.galactica/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start galactica.service.service && sudo journalctl -u galactica.service.service -f --no-hostname -o cat
```