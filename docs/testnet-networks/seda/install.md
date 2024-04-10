---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-seda">
# Installation
</div>
###### Chain ID: `seda-1-testnet` | Current Node Version: `0.0.7`

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
### Clone Seda repo and build sedad 0.0.7
```js
cd $HOME
git clone https://github.com/sedaprotocol.git
cd sedaprotocol
git checkout 0.0.7
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.sedad/cosmovisor/upgrades/0.0.7/bin
mv build/sedad ~/.sedad/cosmovisor/upgrades/0.0.7/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.sedad/cosmovisor/genesis ~/.sedad/cosmovisor/current -f
sudo ln -s ~/.sedad/cosmovisor/current/bin/sedad /usr/local/bin/sedad -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/seda.service > /dev/null << EOF
[Unit]
Description=seda node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.sedad"
Environment="DAEMON_NAME=sedad"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.sedad/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable seda.service.service
```

## Node configuration
### Set config
```js
sedad config chain-id seda-1-testnet
sedad config keyring-backend os
sedad config node tcp://localhost:26657
```

### Initialize the node
```js
sedad init NAME_OF_YOUR_VALIDATOR --chain-id seda-1-testnet
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/seda/genesis.json > ~/.sedad/config/genesis.json
curl -Ls https://config-t.noders.services/seda/addrbook.json > ~/.sedad/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"3bae0d27a2e2889ebcc4c84918dda1df950ec694@seda-t-rpc.noders.services:24656\"/" ~/.sedad/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001useda\"|" ~/.sedad/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.sedad/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.sedad/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.sedad/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start seda.service.service && sudo journalctl -u seda.service.service -f --no-hostname -o cat
```