---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-quicksilver">
# CLI Cheatsheet
</div>
###### Chain ID: `rhye-3` | Current Node Version: `v1.8.0-rc.1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
quicksilverd keys add KEY
```

### Recover key (via existing mnemonic)
```js
quicksilverd keys add KEY --recover
```

### List all keys
```js
quicksilverd keys list
```

### Delete key
```js
quicksilverd keys delete KEY
```

## Wallet
### Wallet balance
```js
quicksilverd q bank balances $(quicksilverd keys show KEY -a) --node https://quicksilver-t-rpc.noders.services:443
```

### Send
```js
quicksilverd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uqck \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

### Withdraw rewards from all validators
```js
quicksilverd tx distribution withdraw-all-rewards \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

### Withdraw Rewards including Commission
```js
quicksilverd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

### Delegate tokens to yourself
```js
quicksilverd tx staking delegate $(quicksilverd keys show KEY --bech val -a) 1000000uqck \
--chain-id rhye-3 \
--node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
--from KEY
```

### Delegate tokens to validator
```js
quicksilverd tx staking delegate VALIDATOR_ADDRESS 1000000uqck \
--chain-id rhye-3 \
--node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
--from KEY
```

### Redelegate tokens to another validator
```js
quicksilverd tx staking redelegate $(quicksilverd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uqck \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

### Unbond tokens from your validator
```js
quicksilverd tx staking unbond $(quicksilverd keys show KEY --bech val -a) uqck \
  --chain-id andromeda-1 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

## Governance
### List of all proposals
```js
quicksilverd query gov proposals --node https://quicksilver-t-rpc.noders.services:443
```
### Check vote
```js
quicksilverd query gov proposal PROPOSAL_NUMBER \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
quicksilverd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
quicksilverd tx staking create-validator \
  --amount 1000000uqck \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(quicksilverd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

### Edit validator
```js
quicksilverd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id rhye-3 \
--commission-rate 0.05 \
--from KEY \
--node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
```

### Unjail
```js
quicksilverd tx slashing unjail \
  --chain-id rhye-3 \
  --node https://quicksilver-t-rpc.noders.services:443 --fees 20000uqck \
  --from KEY
```

### Jail reason
```js
quicksilverd query slashing signing-info $(quicksilverd tendermint show-validator)
```

### Validator details
```js
quicksilverd q staking validator $(quicksilverd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
quicksilverd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
quicksilverd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(quicksilverd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.quicksilverd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(quicksilverd q staking validator $(quicksilverd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(quicksilverd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://quicksilver-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uqck\"/" ~/.quicksilverd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.quicksilverd/config/config.toml
```

### Reset chain data
```js
quicksilverd tendermint unsafe-reset-all --keep-addr-book --home ~/.quicksilverd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable quicksilverd
```

### Disable service
```js
sudo systemctl disable quicksilverd
```

### Start service
```js
sudo systemctl start quicksilverd
```

### Stop service
```js
sudo systemctl stop quicksilverd
```

### Restart service
```js
sudo systemctl restart quicksilverd
```

### Check service status
```js
sudo systemctl status quicksilverd
```

### Check service logs
```js
sudo journalctl -u quicksilverd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop quicksilverd
sudo systemctl disable quicksilverd
sudo rm /etc/systemd/system/quicksilverd.service
sudo systemctl daemon-reload
rm -f $(which quicksilverd)
rm -rf ~/.quicksilverd
rm -rf $HOME/quicksilver-zone
```