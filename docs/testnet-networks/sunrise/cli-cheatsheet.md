---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-sunrise">
# CLI Cheatsheet
</div>
###### Chain ID: `sunrise-test-0.2` | Current Node Version: `v0.2.3`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
sunrised keys add KEY
```

### Recover key (via existing mnemonic)
```js
sunrised keys add KEY --recover
```

### List all keys
```js
sunrised keys list
```

### Delete key
```js
sunrised keys delete KEY
```

## Wallet
### Wallet balance
```js
sunrised q bank balances $(sunrised keys show KEY -a) --node https://sunrise-t-rpc.noders.services:443
```

### Send
```js
sunrised tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uvrise \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

### Withdraw rewards from all validators
```js
sunrised tx distribution withdraw-all-rewards \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

### Withdraw Rewards including Commission
```js
sunrised tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

### Delegate tokens to yourself
```js
sunrised tx staking delegate $(sunrised keys show KEY --bech val -a) 1000000uvrise \
--chain-id sunrise-test-0.2 \
--node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
--from KEY
```

### Delegate tokens to validator
```js
sunrised tx staking delegate VALIDATOR_ADDRESS 1000000uvrise \
--chain-id sunrise-test-0.2 \
--node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
--from KEY
```

### Redelegate tokens to another validator
```js
sunrised tx staking redelegate $(sunrised keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uvrise \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

### Unbond tokens from your validator
```js
sunrised tx staking unbond $(sunrised keys show KEY --bech val -a) uvrise \
  --chain-id andromeda-1 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

## Governance
### List of all proposals
```js
sunrised query gov proposals --node https://sunrise-t-rpc.noders.services:443
```
### Check vote
```js
sunrised query gov proposal PROPOSAL_NUMBER \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
sunrised tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
sunrised tx staking create-validator \
  --amount 1000000uvrise \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(sunrised tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

### Edit validator
```js
sunrised tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id sunrise-test-0.2 \
--commission-rate 0.05 \
--from KEY \
--node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
```

### Unjail
```js
sunrised tx slashing unjail \
  --chain-id sunrise-test-0.2 \
  --node https://sunrise-t-rpc.noders.services:443 --fees 3000uvrise \
  --from KEY
```

### Jail reason
```js
sunrised query slashing signing-info $(sunrised tendermint show-validator)
```

### Validator details
```js
sunrised q staking validator $(sunrised keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
sunrised status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
sunrised status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(sunrised tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.sunrise/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(sunrised q staking validator $(sunrised keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(sunrised status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://sunrise-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uvrise\"/" ~/.sunrise/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.sunrise/config/config.toml
```

### Reset chain data
```js
sunrised tendermint unsafe-reset-all --keep-addr-book --home ~/.sunrise
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable sunrised
```

### Disable service
```js
sudo systemctl disable sunrised
```

### Start service
```js
sudo systemctl start sunrised
```

### Stop service
```js
sudo systemctl stop sunrised
```

### Restart service
```js
sudo systemctl restart sunrised
```

### Check service status
```js
sudo systemctl status sunrised
```

### Check service logs
```js
sudo journalctl -u sunrised -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop sunrised
sudo systemctl disable sunrised
sudo rm /etc/systemd/system/sunrise.service
sudo systemctl daemon-reload
rm -f $(which sunrised)
rm -rf ~/.sunrise
rm -rf $HOME/sunrise
```