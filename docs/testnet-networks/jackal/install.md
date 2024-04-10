---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-jackal">
# Installation
</div>
###### Chain ID: `` | Current Node Version: `null`

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
### Clone Jackal repo and build canined null
```js
cd $HOME
git clone https://github.com/JackalLabs/canine-chain.git
cd canine-chain
git checkout null
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.canine/cosmovisor/upgrades/null/bin
mv build/canined ~/.canine/cosmovisor/upgrades/null/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.canine/cosmovisor/genesis ~/.canine/cosmovisor/current -f
sudo ln -s ~/.canine/cosmovisor/current/bin/canined /usr/local/bin/canined -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/canined.service > /dev/null << EOF
[Unit]
Description=jackal node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.canine"
Environment="DAEMON_NAME=canined"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.canine/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable canined.service.service
```

## Node configuration
### Set config
```js
canined config chain-id 
canined config keyring-backend os
canined config node tcp://localhost:26657
```

### Initialize the node
```js
canined init NAME_OF_YOUR_VALIDATOR --chain-id 
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/jackal/genesis.json > ~/.canine/config/genesis.json
curl -Ls https://config-t.noders.services/jackal/addrbook.json > ~/.canine/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"@jackal-t-rpc.noders.services:\"/" ~/.canine/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ujckl\"|" ~/.canine/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.canine/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.canine/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.canine/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start canined.service.service && sudo journalctl -u canined.service.service -f --no-hostname -o cat
```