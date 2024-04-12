---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-umee">
# CLI Cheatsheet
</div>
###### Chain ID: `umee-1` | Current Node Version: `v6.4.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
umeed keys add KEY
```

### Recover key (via existing mnemonic)
```js
umeed keys add KEY --recover
```

### List all keys
```js
umeed keys list
```

### Delete key
```js
umeed keys delete KEY
```

## Wallet
### Wallet balance
```js
umeed q bank balances $(umeed keys show KEY -a) --node https://umee-rpc.noders.services:443
```

### Send
```js
umeed tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uumee \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

### Withdraw rewards from all validators
```js
umeed tx distribution withdraw-all-rewards \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

### Withdraw Rewards including Commission
```js
umeed tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

### Delegate tokens to yourself
```js
umeed tx staking delegate $(umeed keys show KEY --bech val -a) 1000000uumee \
--chain-id umee-1 \
--node https://umee-rpc.noders.services:443 --fees 3000uumee \
--from KEY
```

### Delegate tokens to validator
```js
umeed tx staking delegate VALIDATOR_ADDRESS 1000000uumee \
--chain-id umee-1 \
--node https://umee-rpc.noders.services:443 --fees 3000uumee \
--from KEY
```

### Redelegate tokens to another validator
```js
umeed tx staking redelegate $(umeed keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uumee \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

### Unbond tokens from your validator
```js
umeed tx staking unbond $(umeed keys show KEY --bech val -a) uumee \
  --chain-id andromeda-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

## Governance
### List of all proposals
```js
umeed query gov proposals --node https://umee-rpc.noders.services:443
```
### Check vote
```js
umeed query gov proposal PROPOSAL_NUMBER \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no 
* no_with_veto
* abstain
```js
umeed tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
umeed tx staking create-validator \
  --amount 1000000uumee \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(umeed tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

### Edit validator
```js
umeed tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id umee-1 \
--commission-rate 0.05 \
--from KEY \
--node https://umee-rpc.noders.services:443 --fees 3000uumee \
```

### Unjail
```js
umeed tx slashing unjail \
  --chain-id umee-1 \
  --node https://umee-rpc.noders.services:443 --fees 3000uumee \
  --from KEY
```

### Jail reason
```js
umeed query slashing signing-info $(umeed tendermint show-validator)
```

### Validator details
```js
umeed q staking validator $(umeed keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
umeed status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
umeed status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(umeed tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.umee/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(umeed q staking validator $(umeed keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(umeed status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://umee-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uumee\"/" ~/.umee/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.umee/config/config.toml
```

### Reset chain data
```js
umeed tendermint unsafe-reset-all --keep-addr-book --home ~/.umee
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable umeed
```

### Disable service
```js
sudo systemctl disable umeed
```

### Start service
```js
sudo systemctl start umeed
```

### Stop service
```js
sudo systemctl stop umeed
```

### Restart service
```js
sudo systemctl restart umeed
```

### Check service status
```js
sudo systemctl status umeed
```

### Check service logs
```js
sudo journalctl -u umeed -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop umeed
sudo systemctl disable umeed
sudo rm /etc/systemd/system/umeed.service
sudo systemctl daemon-reload
rm -f $(which umeed)
rm -rf ~/.umee
rm -rf $HOME/umee-network
```
