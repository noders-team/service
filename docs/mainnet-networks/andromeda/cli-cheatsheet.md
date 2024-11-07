---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-andromeda">
# CLI Cheatsheet
</div>
###### Chain ID: `andromeda-1` | Current Node Version: `v2.0.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
andromedad keys add KEY
```

### Recover key (via existing mnemonic)
```js
andromedad keys add KEY --recover
```

### List all keys
```js
andromedad keys list
```

### Delete key
```js
andromedad keys delete KEY
```

## Wallet
### Wallet balance
```js
andromedad q bank balances $(andromedad keys show KEY -a) --node https://andromeda-rpc.noders.services:443
```

### Send
```js
andromedad tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uandr \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

### Withdraw rewards from all validators
```js
andromedad tx distribution withdraw-all-rewards \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

### Withdraw Rewards including Commission
```js
andromedad tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

### Delegate tokens to yourself
```js
andromedad tx staking delegate $(andromedad keys show KEY --bech val -a) 1000000uandr \
--chain-id andromeda-1 \
--node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
--from KEY
```

### Delegate tokens to validator
```js
andromedad tx staking delegate VALIDATOR_ADDRESS 1000000uandr \
--chain-id andromeda-1 \
--node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
--from KEY
```

### Redelegate tokens to another validator
```js
andromedad tx staking redelegate $(andromedad keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uandr \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

### Unbond tokens from your validator
```js
andromedad tx staking unbond $(andromedad keys show KEY --bech val -a) uandr \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

## Governance
### List of all proposals
```js
andromedad query gov proposals --node https://andromeda-rpc.noders.services:443
```
### Check vote
```js
andromedad query gov proposal PROPOSAL_NUMBER \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
andromedad tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
andromedad tx staking create-validator \
  --amount 1000000uandr \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(andromedad tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

### Edit validator
```js
andromedad tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id andromeda-1 \
--commission-rate 0.05 \
--from KEY \
--node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
```

### Unjail
```js
andromedad tx slashing unjail \
  --chain-id andromeda-1 \
  --node https://andromeda-rpc.noders.services:443 --fees 3000uandr \
  --from KEY
```

### Jail reason
```js
andromedad query slashing signing-info $(andromedad tendermint show-validator)
```

### Validator details
```js
andromedad q staking validator $(andromedad keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
andromedad status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
andromedad status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(andromedad tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.andromeda/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(andromedad q staking validator $(andromedad keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(andromedad status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://andromeda-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uandr\"/" ~/.andromeda/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.andromeda/config/config.toml
```

### Reset chain data
```js
andromedad tendermint unsafe-reset-all --keep-addr-book --home ~/.andromeda
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable andromedad
```

### Disable service
```js
sudo systemctl disable andromedad
```

### Start service
```js
sudo systemctl start andromedad
```

### Stop service
```js
sudo systemctl stop andromedad
```

### Restart service
```js
sudo systemctl restart andromedad
```

### Check service status
```js
sudo systemctl status andromedad
```

### Check service logs
```js
sudo journalctl -u andromedad -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop andromedad
sudo systemctl disable andromedad
sudo rm /etc/systemd/system/andromedad.service
sudo systemctl daemon-reload
rm -f $(which andromedad)
rm -rf ~/.andromeda
rm -rf $HOME/andromedaprotocol
```
