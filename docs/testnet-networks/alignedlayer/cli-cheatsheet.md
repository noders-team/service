---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-alignedlayer">
# CLI Cheatsheet
</div>
###### Chain ID: `alignedlayer` | Current Node Version: `v0.1.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
alignedlayerd keys add KEY
```

### Recover key (via existing mnemonic)
```js
alignedlayerd keys add KEY --recover
```

### List all keys
```js
alignedlayerd keys list
```

### Delete key
```js
alignedlayerd keys delete KEY
```

## Wallet
### Wallet balance
```js
alignedlayerd q bank balances $(alignedlayerd keys show KEY -a) --node https://aligned-t-rpc.noders.services:443
```

### Send
```js
alignedlayerd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000stake \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

### Withdraw rewards from all validators
```js
alignedlayerd tx distribution withdraw-all-rewards \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

### Withdraw Rewards including Commission
```js
alignedlayerd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

### Delegate tokens to yourself
```js
alignedlayerd tx staking delegate $(alignedlayerd keys show KEY --bech val -a) 1000000stake \
--chain-id alignedlayer \
--node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
--from KEY
```

### Delegate tokens to validator
```js
alignedlayerd tx staking delegate VALIDATOR_ADDRESS 1000000stake \
--chain-id alignedlayer \
--node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
--from KEY
```

### Redelegate tokens to another validator
```js
alignedlayerd tx staking redelegate $(alignedlayerd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000stake \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

### Unbond tokens from your validator
```js
alignedlayerd tx staking unbond $(alignedlayerd keys show KEY --bech val -a) stake \
  --chain-id andromeda-1 \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

## Governance
### List of all proposals
```js
alignedlayerd query gov proposals --node https://aligned-t-rpc.noders.services:443
```
### Check vote
```js
alignedlayerd query gov proposal PROPOSAL_NUMBER \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
alignedlayerd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
alignedlayerd tx staking create-validator \
  --amount 1000000stake \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(alignedlayerd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

### Edit validator
```js
alignedlayerd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id alignedlayer \
--commission-rate 0.05 \
--from KEY \
--node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
```

### Unjail
```js
alignedlayerd tx slashing unjail \
  --chain-id alignedlayer \
  --node https://aligned-t-rpc.noders.services:443 --fees 3000stake \
  --from KEY
```

### Jail reason
```js
alignedlayerd query slashing signing-info $(alignedlayerd tendermint show-validator)
```

### Validator details
```js
alignedlayerd q staking validator $(alignedlayerd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
alignedlayerd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
alignedlayerd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(alignedlayerd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.alignedlayer/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(alignedlayerd q staking validator $(alignedlayerd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(alignedlayerd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://aligned-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001stake\"/" ~/.alignedlayer/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.alignedlayer/config/config.toml
```

### Reset chain data
```js
alignedlayerd tendermint unsafe-reset-all --keep-addr-book --home ~/.alignedlayer
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable alignedlayerd.service
```

### Disable service
```js
sudo systemctl disable alignedlayerd.service
```

### Start service
```js
sudo systemctl start alignedlayerd.service
```

### Stop service
```js
sudo systemctl stop alignedlayerd.service
```

### Restart service
```js
sudo systemctl restart alignedlayerd.service
```

### Check service status
```js
sudo systemctl status alignedlayerd.service
```

### Check service logs
```js
sudo journalctl -u alignedlayerd.service -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop alignedlayerd.service
sudo systemctl disable alignedlayerd.service
sudo rm /etc/systemd/system/alignedlayerd.service
sudo systemctl daemon-reload
rm -f $(which alignedlayerd)
rm -rf ~/.alignedlayer
rm -rf $HOME/aligned_layer
```
