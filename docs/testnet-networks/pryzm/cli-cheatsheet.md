---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-pryzm">
# CLI Cheatsheet
</div>
###### Chain ID: `indigo-1` | Current Node Version: `v0.13.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
pryzmd keys add KEY
```

### Recover key (via existing mnemonic)
```js
pryzmd keys add KEY --recover
```

### List all keys
```js
pryzmd keys list
```

### Delete key
```js
pryzmd keys delete KEY
```

## Wallet
### Wallet balance
```js
pryzmd q bank balances $(pryzmd keys show KEY -a) --node https://pryzm-t-rpc.noders.services:443
```

### Send
```js
pryzmd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000upryzm \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

### Withdraw rewards from all validators
```js
pryzmd tx distribution withdraw-all-rewards \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

### Withdraw Rewards including Commission
```js
pryzmd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

### Delegate tokens to yourself
```js
pryzmd tx staking delegate $(pryzmd keys show KEY --bech val -a) 1000000upryzm \
--chain-id indigo-1 \
--node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
--from KEY
```

### Delegate tokens to validator
```js
pryzmd tx staking delegate VALIDATOR_ADDRESS 1000000upryzm \
--chain-id indigo-1 \
--node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
--from KEY
```

### Redelegate tokens to another validator
```js
pryzmd tx staking redelegate $(pryzmd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000upryzm \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

### Unbond tokens from your validator
```js
pryzmd tx staking unbond $(pryzmd keys show KEY --bech val -a) upryzm \
  --chain-id andromeda-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

## Governance
### List of all proposals
```js
pryzmd query gov proposals --node https://pryzm-t-rpc.noders.services:443
```
### Check vote
```js
pryzmd query gov proposal PROPOSAL_NUMBER \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
pryzmd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
pryzmd tx staking create-validator \
  --amount 1000000upryzm \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(pryzmd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

### Edit validator
```js
pryzmd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id indigo-1 \
--commission-rate 0.05 \
--from KEY \
--node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
```

### Unjail
```js
pryzmd tx slashing unjail \
  --chain-id indigo-1 \
  --node https://pryzm-t-rpc.noders.services:443 --fees 3000upryzm \
  --from KEY
```

### Jail reason
```js
pryzmd query slashing signing-info $(pryzmd tendermint show-validator)
```

### Validator details
```js
pryzmd q staking validator $(pryzmd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
pryzmd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
pryzmd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(pryzmd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.pryzm/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(pryzmd q staking validator $(pryzmd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(pryzmd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://pryzm-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001upryzm\"/" ~/.pryzm/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.pryzm/config/config.toml
```

### Reset chain data
```js
pryzmd tendermint unsafe-reset-all --keep-addr-book --home ~/.pryzm
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable pryzmd
```

### Disable service
```js
sudo systemctl disable pryzmd
```

### Start service
```js
sudo systemctl start pryzmd
```

### Stop service
```js
sudo systemctl stop pryzmd
```

### Restart service
```js
sudo systemctl restart pryzmd
```

### Check service status
```js
sudo systemctl status pryzmd
```

### Check service logs
```js
sudo journalctl -u pryzmd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop pryzmd
sudo systemctl disable pryzmd
sudo rm /etc/systemd/system/pryzm.service
sudo systemctl daemon-reload
rm -f $(which pryzmd)
rm -rf ~/.pryzm
rm -rf $HOME/pryzm-finance
```
