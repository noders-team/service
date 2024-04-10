---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-celestia">
# Installation
</div>
###### Chain ID: `mocha-4` | Current Node Version: `v1.7.0`

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
### Clone Celestia repo and build celestia-appd v1.7.0
```js
cd $HOME
git clone https://github.com/celestiaorg.git
cd celestiaorg
git checkout v1.7.0
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.celestia-app/cosmovisor/upgrades/v1.7.0/bin
mv build/celestia-appd ~/.celestia-app/cosmovisor/upgrades/v1.7.0/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.celestia-app/cosmovisor/genesis ~/.celestia-app/cosmovisor/current -f
sudo ln -s ~/.celestia-app/cosmovisor/current/bin/celestia-appd /usr/local/bin/celestia-appd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/celestia.service > /dev/null << EOF
[Unit]
Description=celestia node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.celestia-app"
Environment="DAEMON_NAME=celestia-appd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.celestia-app/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

## Install without Cosmovisor

### Download and build binaries
### Clone Celestia repo and build celestia-appd v1.7.0
```js
cd $HOME
git clone https://github.com/celestiaorg.git
cd celestiaorg
git checkout v1.7.0
```

### Build binaries
```js
make install
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/celestia.service > /dev/null << EOF
[Unit]
Description=celestia node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia-appd) start
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
sudo systemctl enable celestia.service.service
```

## Node configuration
### Set config
```js
celestia-appd config chain-id mocha-4
celestia-appd config keyring-backend os
celestia-appd config node tcp://localhost:26657
```

### Initialize the node
```js
celestia-appd init NAME_OF_YOUR_VALIDATOR --chain-id mocha-4
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/celestia/genesis.json > ~/.celestia-app/config/genesis.json
curl -Ls https://config-t.noders.services/celestia/addrbook.json > ~/.celestia-app/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"6c3f75284e4bb6a31e54d531bb72dad2aeb76a60@celestia-t-rpc.noders.services:21656\"/" ~/.celestia-app/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001utia\"|" ~/.celestia-app/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.celestia-app/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.celestia-app/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.celestia-app/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start celestia.service.service && sudo journalctl -u celestia.service.service -f --no-hostname -o cat
```