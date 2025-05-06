---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-router">
# CLI Cheatsheet
</div>
###### Chain ID: `null` | Current Node Version: `v1.6.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
routerd keys add KEY
```

### Recover key (via existing mnemonic)
```js
routerd keys add KEY --recover
```

### List all keys
```js
routerd keys list
```

### Delete key
```js
routerd keys delete KEY
```

## Wallet
### Wallet balance
```js
routerd q bank balances $(routerd keys show KEY -a) --node https://router-rpc.noders.services:443
```

### Send
```js
routerd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000route \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

### Withdraw rewards from all validators
```js
routerd tx distribution withdraw-all-rewards \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

### Withdraw Rewards including Commission
```js
routerd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

### Delegate tokens to yourself
```js
routerd tx staking delegate $(routerd keys show KEY --bech val -a) 1000000route \
--chain-id null \
--node https://router-rpc.noders.services:443 --fees 100000000000000route \
--from KEY
```

### Delegate tokens to validator
```js
routerd tx staking delegate VALIDATOR_ADDRESS 1000000route \
--chain-id null \
--node https://router-rpc.noders.services:443 --fees 100000000000000route \
--from KEY
```

### Redelegate tokens to another validator
```js
routerd tx staking redelegate $(routerd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000route \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

### Unbond tokens from your validator
```js
routerd tx staking unbond $(routerd keys show KEY --bech val -a) route \
  --chain-id andromeda-1 \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

## Governance
### List of all proposals
```js
routerd query gov proposals --node https://router-rpc.noders.services:443
```
### Check vote
```js
routerd query gov proposal PROPOSAL_NUMBER \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
routerd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
routerd tx staking create-validator \
  --amount 1000000route \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(routerd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

### Edit validator
```js
routerd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id null \
--commission-rate 0.05 \
--from KEY \
--node https://router-rpc.noders.services:443 --fees 100000000000000route \
```

### Unjail
```js
routerd tx slashing unjail \
  --chain-id null \
  --node https://router-rpc.noders.services:443 --fees 100000000000000route \
  --from KEY
```

### Jail reason
```js
routerd query slashing signing-info $(routerd tendermint show-validator)
```

### Validator details
```js
routerd q staking validator $(routerd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
routerd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
routerd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(routerd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.routerd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(routerd q staking validator $(routerd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(routerd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://router-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001route\"/" ~/.routerd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.routerd/config/config.toml
```

### Reset chain data
```js
routerd tendermint unsafe-reset-all --keep-addr-book --home ~/.routerd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable routerd
```

### Disable service
```js
sudo systemctl disable routerd
```

### Start service
```js
sudo systemctl start routerd
```

### Stop service
```js
sudo systemctl stop routerd
```

### Restart service
```js
sudo systemctl restart routerd
```

### Check service status
```js
sudo systemctl status routerd
```

### Check service logs
```js
sudo journalctl -u routerd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop routerd
sudo systemctl disable routerd
sudo rm /etc/systemd/system/router.service
sudo systemctl daemon-reload
rm -f $(which routerd)
rm -rf ~/.routerd
rm -rf $HOME/router-protocol
```
