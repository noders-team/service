---
hide_table_of_contents: false
title: Installation
sidebar_position: 2
---

<div class="h1-with-icon icon-swisstronic">
# Installation
</div>
###### Chain ID: `swisstronik_1291-1` | Current Node Version: `v1.0.1`

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
### Clone Swisstronic repo and build swisstronikd v1.0.1
```js
cd $HOME
git clone https://github.com/SigmaGmbH.git
cd SigmaGmbH
git checkout v1.0.1
```

### Build binaries
```js
make build
```
### Prepare binaries for Cosmovisor
```js
cd $HOME
mkdir -p ~/.swisstronik/cosmovisor/upgrades/v1.0.1/bin
mv build/swisstronikd ~/.swisstronik/cosmovisor/upgrades/v1.0.1/bin/
rm -rf build
```

### Create symlinks
```js
sudo ln -s ~/.swisstronik/cosmovisor/genesis ~/.swisstronik/cosmovisor/current -f
sudo ln -s ~/.swisstronik/cosmovisor/current/bin/swisstronikd /usr/local/bin/swisstronikd -f
```

## Download and install Cosmovisor
```js
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

## Run node
### Create service
```js
sudo tee /etc/systemd/system/swisstronik.service > /dev/null << EOF
[Unit]
Description=swisstronic node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=~/.swisstronik"
Environment="DAEMON_NAME=swisstronikd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:~/.swisstronik/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
```

### Enable service
```js
sudo systemctl daemon-reload
sudo systemctl enable swisstronik.service.service
```

## Node configuration
### Set config
```js
swisstronikd config chain-id swisstronik_1291-1
swisstronikd config keyring-backend os
swisstronikd config node tcp://localhost:26657
```

### Initialize the node
```js
swisstronikd init NAME_OF_YOUR_VALIDATOR --chain-id swisstronik_1291-1
```

### Download genesis and addrbook
```js
curl -Ls https://config-t.noders.services/swisstronic/genesis.json > ~/.swisstronik/config/genesis.json
curl -Ls https://config-t.noders.services/swisstronic/addrbook.json > ~/.swisstronik/config/addrbook.json
```
### Add peers
```js
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"1db22294bec0fd095eaa4a3f2381aef5105b538c@swisstronik-t-rpc.noders.services:26656\"/" ~/.swisstronik/config/config.toml
```

### Set minimum gas price
```js
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001uswtr\"|" ~/.swisstronik/config/app.toml
```
### Set pruning
```js
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  ~/.swisstronik/config/app.toml
```

### Set custom ports
```js
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:14758\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:14757\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:14760\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:14756\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":14766\"%" ~/.swisstronik/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:14717\"%; s%^address = \":8080\"%address = \":14780\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:14790\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:14791\"%; s%:8545%:14745%; s%:8546%:14746%; s%:6065%:14765%" ~/.swisstronik/config/app.toml
```

### Start node and check logs
```js
sudo systemctl start swisstronik.service.service && sudo journalctl -u swisstronik.service.service -f --no-hostname -o cat
```