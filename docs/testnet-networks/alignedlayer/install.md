---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-alignedlayer">
# Installation
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `0.1.0`

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
### Clone Alignedlayer repo and build alignedlayerd 0.1.0
```js
cd $HOME
git clone https://github.com/yetanotherco/aligned_layer.git
cd aligned_layer
git checkout 0.1.0
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.alignedlayer/cosmovisor/upgrades/0.1.0/bin
mv build/alignedlayerd ~/.alignedlayer/cosmovisor/upgrades/0.1.0/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.alignedlayer/cosmovisor/genesis ~/.alignedlayer/cosmovisor/current -f
sudo ln -s ~/.alignedlayer/cosmovisor/current/bin/alignedlayerd /usr/local/bin/alignedlayerd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/alignedlayerd.service > /dev/null << EOF
[Unit]
Description=alignedlayer node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.alignedlayer"
Environment="DAEMON_NAME=alignedlayerd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.alignedlayer/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable alignedlayerd.service.service
```

## Node configuration
### Set config
```js
alignedlayerd config chain-id alignedlayer
alignedlayerd config keyring-backend os
alignedlayerd config node tcp://localhost:26657
```

### Initialize the node
```js
alignedlayerd init NAME_OF_YOUR_VALIDATOR --chain-id alignedlayer
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/alignedlayer/genesis.json > ~/.alignedlayer/config/genesis.json
curl -Ls https://config-t.noders.services/alignedlayer/addrbook.json > ~/.alignedlayer/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"b5da413b7882dc42172818914f55e661fcb88981@aligned-t-rpc.noders.services:27656\"/" ~/.alignedlayer/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001stake\"|" ~/.alignedlayer/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.alignedlayer/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.alignedlayer/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.alignedlayer/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start alignedlayerd.service.service && sudo journalctl -u alignedlayerd.service.service -f --no-hostname -o cat
```