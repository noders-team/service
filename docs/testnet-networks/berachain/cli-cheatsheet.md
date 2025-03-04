---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-berachain">
# CLI Cheatsheet
</div>
###### Chain ID: `bartio-beacon-80084` | Current Node Version: `v0.2.0-alpha.8`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
beacond keys add KEY
```

### Recover key (via existing mnemonic)
```js
beacond keys add KEY --recover
```

### List all keys
```js
beacond keys list
```

### Delete key
```js
beacond keys delete KEY
```

## Wallet
### Wallet balance
```js
beacond q bank balances $(beacond keys show KEY -a) --node https://berachain-t-rpc.noders.services:443
```

### Send
```js
beacond tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000abgt \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Withdraw rewards from all validators
```js
beacond tx distribution withdraw-all-rewards \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Withdraw Rewards including Commission
```js
beacond tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Delegate tokens to yourself
```js
beacond tx staking delegate $(beacond keys show KEY --bech val -a) 1000000abgt \
--chain-id bartio-beacon-80084 \
--node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
--from KEY
```

### Delegate tokens to validator
```js
beacond tx staking delegate VALIDATOR_ADDRESS 1000000abgt \
--chain-id bartio-beacon-80084 \
--node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
--from KEY
```

### Redelegate tokens to another validator
```js
beacond tx staking redelegate $(beacond keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000abgt \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Unbond tokens from your validator
```js
beacond tx staking unbond $(beacond keys show KEY --bech val -a) abgt \
  --chain-id andromeda-1 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

## Governance
### List of all proposals
```js
beacond query gov proposals --node https://berachain-t-rpc.noders.services:443
```
### Check vote
```js
beacond query gov proposal PROPOSAL_NUMBER \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
beacond tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
beacond tx staking create-validator \
  --amount 1000000abgt \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(beacond tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Edit validator
```js
beacond tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id bartio-beacon-80084 \
--commission-rate 0.05 \
--from KEY \
--node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
```

### Unjail
```js
beacond tx slashing unjail \
  --chain-id bartio-beacon-80084 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Jail reason
```js
beacond query slashing signing-info $(beacond tendermint show-validator)
```

### Validator details
```js
beacond q staking validator $(beacond keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
beacond status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
beacond status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(beacond tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.beacond/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(beacond q staking validator $(beacond keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(beacond status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://berachain-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001abgt\"/" ~/.beacond/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.beacond/config/config.toml
```

### Reset chain data
```js
beacond tendermint unsafe-reset-all --keep-addr-book --home ~/.beacond
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable beacond
```

### Disable service
```js
sudo systemctl disable beacond
```

### Start service
```js
sudo systemctl start beacond
```

### Stop service
```js
sudo systemctl stop beacond
```

### Restart service
```js
sudo systemctl restart beacond
```

### Check service status
```js
sudo systemctl status beacond
```

### Check service logs
```js
sudo journalctl -u beacond -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop beacond
sudo systemctl disable beacond
sudo rm /etc/systemd/system/beacond.service
sudo systemctl daemon-reload
rm -f $(which beacond)
rm -rf ~/.beacond
rm -rf $HOME/berachain
```