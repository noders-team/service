---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-althea">
# CLI Cheatsheet
</div>
###### Chain ID: `althea_258432-1` | Current Node Version: `v1.5.1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
althea keys add KEY
```

### Recover key (via existing mnemonic)
```js
althea keys add KEY --recover
```

### List all keys
```js
althea keys list
```

### Delete key
```js
althea keys delete KEY
```

## Wallet
### Wallet balance
```js
althea q bank balances $(althea keys show KEY -a) --node https://althea-rpc.noders.services:443
```

### Send
```js
althea tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000aalthea \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

### Withdraw rewards from all validators
```js
althea tx distribution withdraw-all-rewards \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

### Withdraw Rewards including Commission
```js
althea tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

### Delegate tokens to yourself
```js
althea tx staking delegate $(althea keys show KEY --bech val -a) 1000000aalthea \
--chain-id althea_258432-1 \
--node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
--from KEY
```

### Delegate tokens to validator
```js
althea tx staking delegate VALIDATOR_ADDRESS 1000000aalthea \
--chain-id althea_258432-1 \
--node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
--from KEY
```

### Redelegate tokens to another validator
```js
althea tx staking redelegate $(althea keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000aalthea \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

### Unbond tokens from your validator
```js
althea tx staking unbond $(althea keys show KEY --bech val -a) aalthea \
  --chain-id andromeda-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

## Governance
### List of all proposals
```js
althea query gov proposals --node https://althea-rpc.noders.services:443
```
### Check vote
```js
althea query gov proposal PROPOSAL_NUMBER \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
althea tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
althea tx staking create-validator \
  --amount 1000000aalthea \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(althea tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

### Edit validator
```js
althea tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id althea_258432-1 \
--commission-rate 0.05 \
--from KEY \
--node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
```

### Unjail
```js
althea tx slashing unjail \
  --chain-id althea_258432-1 \
  --node https://althea-rpc.noders.services:443 --fees 30000000aalthea \
  --from KEY
```

### Jail reason
```js
althea query slashing signing-info $(althea tendermint show-validator)
```

### Validator details
```js
althea q staking validator $(althea keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
althea status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
althea status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(althea tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.althea/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(althea q staking validator $(althea keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(althea status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://althea-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001aalthea\"/" ~/.althea/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.althea/config/config.toml
```

### Reset chain data
```js
althea tendermint unsafe-reset-all --keep-addr-book --home ~/.althea
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable althea
```

### Disable service
```js
sudo systemctl disable althea
```

### Start service
```js
sudo systemctl start althea
```

### Stop service
```js
sudo systemctl stop althea
```

### Restart service
```js
sudo systemctl restart althea
```

### Check service status
```js
sudo systemctl status althea
```

### Check service logs
```js
sudo journalctl -u althea -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop althea
sudo systemctl disable althea
sudo rm /etc/systemd/system/althea.service
sudo systemctl daemon-reload
rm -f $(which althea)
rm -rf ~/.althea
rm -rf $HOME/althea-chain
```
