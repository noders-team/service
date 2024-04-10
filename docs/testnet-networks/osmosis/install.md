---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-osmosis">
# Installation
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `23.0.0`

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

## Download and build binaries
### Clone Osmosis repo and build osmosisd 23.0.0
```js
cd $HOME
git clone https://github.com/osmosis-labs/osmosis.git
cd osmosis
git checkout 23.0.0
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.osmosisd/cosmovisor/upgrades/23.0.0/bin
mv build/osmosisd ~/.osmosisd/cosmovisor/upgrades/23.0.0/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.osmosisd/cosmovisor/genesis ~/.osmosisd/cosmovisor/current -f
sudo ln -s ~/.osmosisd/cosmovisor/current/bin/osmosisd /usr/local/bin/osmosisd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/osmosisd.service > /dev/null << EOF
[Unit]
Description=osmosis node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.osmosisd"
Environment="DAEMON_NAME=osmosisd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.osmosisd/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable osmosisd.service.service
```

## Node configuration
### Set config
```js
osmosisd config chain-id osmosis-1
osmosisd config keyring-backend os
osmosisd config node tcp://localhost:26657
```

### Initialize the node
```js
osmosisd init NAME_OF_YOUR_VALIDATOR --chain-id osmosis-1
```

### Download genesis and addrbook
```js
curl -Ls https://config.noders.services/osmosis/genesis.json > ~/.osmosisd/config/genesis.json
curl -Ls https://config.noders.services/osmosis/addrbook.json > ~/.osmosisd/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"91570c5f4e2a54ce53996475aea4f530e0669a2e@osmosis.rpc.mainnet.noders.team:10656\"/" ~/.osmosisd/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uosmo\"|" ~/.osmosisd/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.osmosisd/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.osmosisd/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.osmosisd/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start osmosisd.service.service && sudo journalctl -u osmosisd.service.service -f --no-hostname -o cat
```