---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-entrypoint">
# CLI Cheatsheet
</div>
###### Chain ID: `entrypoint-pubtest-2` | Current Node Version: `v1.3.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
entrypointd keys add KEY
```

### Recover key (via existing mnemonic)
```js
entrypointd keys add KEY --recover
```

### List all keys
```js
entrypointd keys list
```

### Delete key
```js
entrypointd keys delete KEY
```

## Wallet
### Wallet balance
```js
entrypointd q bank balances $(entrypointd keys show KEY -a) --node https://entrypoint-t-rpc.noders.services:443
```

### Send
```js
entrypointd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uentry \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

### Withdraw rewards from all validators
```js
entrypointd tx distribution withdraw-all-rewards \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

### Withdraw Rewards including Commission
```js
entrypointd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

### Delegate tokens to yourself
```js
entrypointd tx staking delegate $(entrypointd keys show KEY --bech val -a) 1000000uentry \
--chain-id entrypoint-pubtest-2 \
--node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
--from KEY
```

### Delegate tokens to validator
```js
entrypointd tx staking delegate VALIDATOR_ADDRESS 1000000uentry \
--chain-id entrypoint-pubtest-2 \
--node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
--from KEY
```

### Redelegate tokens to another validator
```js
entrypointd tx staking redelegate $(entrypointd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uentry \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

### Unbond tokens from your validator
```js
entrypointd tx staking unbond $(entrypointd keys show KEY --bech val -a) uentry \
  --chain-id andromeda-1 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

## Governance
### List of all proposals
```js
entrypointd query gov proposals --node https://entrypoint-t-rpc.noders.services:443
```
### Check vote
```js
entrypointd query gov proposal PROPOSAL_NUMBER \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
entrypointd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
entrypointd tx staking create-validator \
  --amount 1000000uentry \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(entrypointd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

### Edit validator
```js
entrypointd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id entrypoint-pubtest-2 \
--commission-rate 0.05 \
--from KEY \
--node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
```

### Unjail
```js
entrypointd tx slashing unjail \
  --chain-id entrypoint-pubtest-2 \
  --node https://entrypoint-t-rpc.noders.services:443 --fees 3000uentry \
  --from KEY
```

### Jail reason
```js
entrypointd query slashing signing-info $(entrypointd tendermint show-validator)
```

### Validator details
```js
entrypointd q staking validator $(entrypointd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
entrypointd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
entrypointd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(entrypointd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.entrypoint/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(entrypointd q staking validator $(entrypointd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(entrypointd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://entrypoint-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uentry\"/" ~/.entrypoint/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.entrypoint/config/config.toml
```

### Reset chain data
```js
entrypointd tendermint unsafe-reset-all --keep-addr-book --home ~/.entrypoint
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable entrypoint.service
```

### Disable service
```js
sudo systemctl disable entrypoint.service
```

### Start service
```js
sudo systemctl start entrypoint.service
```

### Stop service
```js
sudo systemctl stop entrypoint.service
```

### Restart service
```js
sudo systemctl restart entrypoint.service
```

### Check service status
```js
sudo systemctl status entrypoint.service
```

### Check service logs
```js
sudo journalctl -u entrypoint.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop entrypoint.service
sudo systemctl disable entrypoint.service
sudo rm /etc/systemd/system/entrypoint.service
sudo systemctl daemon-reload
rm -f $(which entrypointd)
rm -rf ~/.entrypoint
rm -rf $HOME/entrypoint-zone
```