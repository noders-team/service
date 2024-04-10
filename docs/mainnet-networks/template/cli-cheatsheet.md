---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# CLI Cheatsheet
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[VERSION]`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
[DAEMON_NAME] keys add KEY
```

### Recover key (via existing mnemonic)
```js
[DAEMON_NAME] keys add KEY --recover
```

### List all keys
```js
[DAEMON_NAME] keys list
```

### Delete key
```js
[DAEMON_NAME] keys delete KEY
```

## Wallet
### Wallet balance
```js
[DAEMON_NAME] q bank balances $([DAEMON_NAME] keys show KEY -a) --node [ENDPOINT_RPC]:443
```

### Send
```js
[DAEMON_NAME] tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000[CHAIN_DENOM] \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Withdraw rewards from all validators
```js
[DAEMON_NAME] tx distribution withdraw-all-rewards \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Withdraw Rewards including Commission
```js
[DAEMON_NAME] tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Delegate tokens to yourself
```js
[DAEMON_NAME] tx staking delegate $([DAEMON_NAME] keys show KEY --bech val -a) 1000000[CHAIN_DENOM] \
--chain-id [CHAIN_ID] \
--node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
--from KEY
```

### Delegate tokens to validator
```js
[DAEMON_NAME] tx staking delegate VALIDATOR_ADDRESS 1000000[CHAIN_DENOM] \
--chain-id [CHAIN_ID] \
--node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
--from KEY
```

### Redelegate tokens to another validator
```js
[DAEMON_NAME] tx staking redelegate $([DAEMON_NAME] keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000[CHAIN_DENOM] \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Unbond tokens from your validator
```js
[DAEMON_NAME] tx staking unbond $([DAEMON_NAME] keys show KEY --bech val -a) [CHAIN_DENOM] \
  --chain-id andromeda-1 \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

## Governance
### List of all proposals
```js
[DAEMON_NAME] query gov proposals --node [ENDPOINT_RPC]:443
```
### Check vote
```js
[DAEMON_NAME] query gov proposal PROPOSAL_NUMBER \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
[DAEMON_NAME] tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
[DAEMON_NAME] tx staking create-validator \
  --amount 1000000[CHAIN_DENOM] \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$([DAEMON_NAME] tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Edit validator
```js
[DAEMON_NAME] tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id [CHAIN_ID] \
--commission-rate 0.05 \
--from KEY \
--node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
```

### Unjail
```js
[DAEMON_NAME] tx slashing unjail \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Jail reason
```js
[DAEMON_NAME] query slashing signing-info $([DAEMON_NAME] tendermint show-validator)
```

### Validator details
```js
[DAEMON_NAME] q staking validator $([DAEMON_NAME] keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
[DAEMON_NAME] status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
[DAEMON_NAME] status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $([DAEMON_NAME] tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat [DAEMON_HOME]/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $([DAEMON_NAME] q staking validator $([DAEMON_NAME] keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $([DAEMON_NAME] status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS [ENDPOINT_RPC]:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001[CHAIN_DENOM]\"/" [DAEMON_HOME]/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" [DAEMON_HOME]/config/config.toml
```

### Reset chain data
```js
[DAEMON_NAME] tendermint unsafe-reset-all --keep-addr-book --home [DAEMON_HOME]
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable [DAEMON_SERVICE]
```

### Disable service
```js
sudo systemctl disable [DAEMON_SERVICE]
```

### Start service
```js
sudo systemctl start [DAEMON_SERVICE]
```

### Stop service
```js
sudo systemctl stop [DAEMON_SERVICE]
```

### Restart service
```js
sudo systemctl restart [DAEMON_SERVICE]
```

### Check service status
```js
sudo systemctl status [DAEMON_SERVICE]
```

### Check service logs
```js
sudo journalctl -u [DAEMON_SERVICE] -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop [DAEMON_SERVICE]
sudo systemctl disable [DAEMON_SERVICE]
sudo rm /etc/systemd/system/[DAEMON_SERVICE]
sudo systemctl daemon-reload
rm -f $(which [DAEMON_NAME])
rm -rf [DAEMON_HOME]
rm -rf $HOME/[GITHUB_FOLDER_NAME]
```
