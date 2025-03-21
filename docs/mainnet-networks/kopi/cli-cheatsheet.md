---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-kopi">
# CLI Cheatsheet
</div>
###### Chain ID: `luwak-1` | Current Node Version: `v18.4`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
uxkp keys add KEY
```

### Recover key (via existing mnemonic)
```js
uxkp keys add KEY --recover
```

### List all keys
```js
uxkp keys list
```

### Delete key
```js
uxkp keys delete KEY
```

## Wallet
### Wallet balance
```js
uxkp q bank balances $(uxkp keys show KEY -a) --node https://kopi-rpc.noders.services:443
```

### Send
```js
uxkp tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000abgt \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Withdraw rewards from all validators
```js
uxkp tx distribution withdraw-all-rewards \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Withdraw Rewards including Commission
```js
uxkp tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Delegate tokens to yourself
```js
uxkp tx staking delegate $(uxkp keys show KEY --bech val -a) 1000000abgt \
--chain-id luwak-1 \
--node https://kopi-rpc.noders.services:443 --fees 3000abgt \
--from KEY
```

### Delegate tokens to validator
```js
uxkp tx staking delegate VALIDATOR_ADDRESS 1000000abgt \
--chain-id luwak-1 \
--node https://kopi-rpc.noders.services:443 --fees 3000abgt \
--from KEY
```

### Redelegate tokens to another validator
```js
uxkp tx staking redelegate $(uxkp keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000abgt \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Unbond tokens from your validator
```js
uxkp tx staking unbond $(uxkp keys show KEY --bech val -a) abgt \
  --chain-id andromeda-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

## Governance
### List of all proposals
```js
uxkp query gov proposals --node https://kopi-rpc.noders.services:443
```
### Check vote
```js
uxkp query gov proposal PROPOSAL_NUMBER \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
uxkp tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
uxkp tx staking create-validator \
  --amount 1000000abgt \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(uxkp tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Edit validator
```js
uxkp tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id luwak-1 \
--commission-rate 0.05 \
--from KEY \
--node https://kopi-rpc.noders.services:443 --fees 3000abgt \
```

### Unjail
```js
uxkp tx slashing unjail \
  --chain-id luwak-1 \
  --node https://kopi-rpc.noders.services:443 --fees 3000abgt \
  --from KEY
```

### Jail reason
```js
uxkp query slashing signing-info $(uxkp tendermint show-validator)
```

### Validator details
```js
uxkp q staking validator $(uxkp keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
uxkp status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
uxkp status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(uxkp tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.kopid/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(uxkp q staking validator $(uxkp keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(uxkp status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://kopi-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001abgt\"/" ~/.kopid/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.kopid/config/config.toml
```

### Reset chain data
```js
uxkp tendermint unsafe-reset-all --keep-addr-book --home ~/.kopid
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable uxkp
```

### Disable service
```js
sudo systemctl disable uxkp
```

### Start service
```js
sudo systemctl start uxkp
```

### Stop service
```js
sudo systemctl stop uxkp
```

### Restart service
```js
sudo systemctl restart uxkp
```

### Check service status
```js
sudo systemctl status uxkp
```

### Check service logs
```js
sudo journalctl -u uxkp -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop uxkp
sudo systemctl disable uxkp
sudo rm /etc/systemd/system/kopi.service
sudo systemctl daemon-reload
rm -f $(which uxkp)
rm -rf ~/.kopid
rm -rf $HOME/kopi
```
