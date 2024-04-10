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
sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.3.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)
```

## Download and build binaries
### Clone Artela repo and build artelad v0.4.7-rc6
```js
cd $HOME
git clone https://github.com/artela-network.git
cd artela-network
git checkout v0.4.7-rc6
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.artelad/cosmovisor/upgrades/v0.4.7-rc6/bin
mv build/artelad ~/.artelad/cosmovisor/upgrades/v0.4.7-rc6/bin/
rm -rf build
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
sudo tee /etc/systemd/system/artela.service > /dev/null << EOF
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

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable artela.service.service
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
curl -Ls https://config-t.noders.services/artela/genesis.json > ~/.artelad/config/genesis.json
curl -Ls https://config-t.noders.services/artela/addrbook.json > ~/.artelad/config/addrbook.json
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
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.artelad/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.artelad/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start artela.service.service && sudo journalctl -u artela.service.service -f --no-hostname -o cat
```