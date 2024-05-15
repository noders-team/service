---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-og">
# CLI Cheatsheet
</div>
###### Chain ID: `zgtendermint_9000-1` | Current Node Version: `v1.0.0-testnet`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
evmosd keys add KEY
```

### Recover key (via existing mnemonic)
```js
evmosd keys add KEY --recover
```

### List all keys
```js
evmosd keys list
```

### Delete key
```js
evmosd keys delete KEY
```

## Wallet
### Wallet balance
```js
evmosd q bank balances $(evmosd keys show KEY -a) --node https://og-t-rpc.noders.services:443
```

### Send
```js
evmosd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000evmos \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

### Withdraw rewards from all validators
```js
evmosd tx distribution withdraw-all-rewards \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

### Withdraw Rewards including Commission
```js
evmosd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

### Delegate tokens to yourself
```js
evmosd tx staking delegate $(evmosd keys show KEY --bech val -a) 1000000evmos \
--chain-id zgtendermint_9000-1 \
--node https://og-t-rpc.noders.services:443 --fees 3000evmos \
--from KEY
```

### Delegate tokens to validator
```js
evmosd tx staking delegate VALIDATOR_ADDRESS 1000000evmos \
--chain-id zgtendermint_9000-1 \
--node https://og-t-rpc.noders.services:443 --fees 3000evmos \
--from KEY
```

### Redelegate tokens to another validator
```js
evmosd tx staking redelegate $(evmosd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000evmos \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

### Unbond tokens from your validator
```js
evmosd tx staking unbond $(evmosd keys show KEY --bech val -a) evmos \
  --chain-id andromeda-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

## Governance
### List of all proposals
```js
evmosd query gov proposals --node https://og-t-rpc.noders.services:443
```
### Check vote
```js
evmosd query gov proposal PROPOSAL_NUMBER \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
evmosd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
evmosd tx staking create-validator \
  --amount 1000000evmos \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(evmosd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

### Edit validator
```js
evmosd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id zgtendermint_9000-1 \
--commission-rate 0.05 \
--from KEY \
--node https://og-t-rpc.noders.services:443 --fees 3000evmos \
```

### Unjail
```js
evmosd tx slashing unjail \
  --chain-id zgtendermint_9000-1 \
  --node https://og-t-rpc.noders.services:443 --fees 3000evmos \
  --from KEY
```

### Jail reason
```js
evmosd query slashing signing-info $(evmosd tendermint show-validator)
```

### Validator details
```js
evmosd q staking validator $(evmosd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
evmosd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
evmosd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(evmosd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.evmosd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(evmosd q staking validator $(evmosd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(evmosd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://og-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001evmos\"/" ~/.evmosd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.evmosd/config/config.toml
```

### Reset chain data
```js
evmosd tendermint unsafe-reset-all --keep-addr-book --home ~/.evmosd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable evmosd
```

### Disable service
```js
sudo systemctl disable evmosd
```

### Start service
```js
sudo systemctl start evmosd
```

### Stop service
```js
sudo systemctl stop evmosd
```

### Restart service
```js
sudo systemctl restart evmosd
```

### Check service status
```js
sudo systemctl status evmosd
```

### Check service logs
```js
sudo journalctl -u evmosd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop evmosd
sudo systemctl disable evmosd
sudo rm /etc/systemd/system/0g.service
sudo systemctl daemon-reload
rm -f $(which evmosd)
rm -rf ~/.evmosd
rm -rf $HOME/0g-evmos
```
