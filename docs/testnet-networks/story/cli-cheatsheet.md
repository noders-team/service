---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-story">
# CLI Cheatsheet
</div>
###### Chain ID: `devnet-1` | Current Node Version: `v1.1.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
story keys add KEY
```

### Recover key (via existing mnemonic)
```js
story keys add KEY --recover
```

### List all keys
```js
story keys list
```

### Delete key
```js
story keys delete KEY
```

## Wallet
### Wallet balance
```js
story q bank balances $(story keys show KEY -a) --node https://story-t-rpc.noders.services:443
```

### Send
```js
story tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000aip \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

### Withdraw rewards from all validators
```js
story tx distribution withdraw-all-rewards \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

### Withdraw Rewards including Commission
```js
story tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

### Delegate tokens to yourself
```js
story tx staking delegate $(story keys show KEY --bech val -a) 1000000aip \
--chain-id devnet-1 \
--node https://story-t-rpc.noders.services:443 --fees 3000aip \
--from KEY
```

### Delegate tokens to validator
```js
story tx staking delegate VALIDATOR_ADDRESS 1000000aip \
--chain-id devnet-1 \
--node https://story-t-rpc.noders.services:443 --fees 3000aip \
--from KEY
```

### Redelegate tokens to another validator
```js
story tx staking redelegate $(story keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000aip \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

### Unbond tokens from your validator
```js
story tx staking unbond $(story keys show KEY --bech val -a) aip \
  --chain-id andromeda-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

## Governance
### List of all proposals
```js
story query gov proposals --node https://story-t-rpc.noders.services:443
```
### Check vote
```js
story query gov proposal PROPOSAL_NUMBER \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
story tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
story tx staking create-validator \
  --amount 1000000aip \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(story tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

### Edit validator
```js
story tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id devnet-1 \
--commission-rate 0.05 \
--from KEY \
--node https://story-t-rpc.noders.services:443 --fees 3000aip \
```

### Unjail
```js
story tx slashing unjail \
  --chain-id devnet-1 \
  --node https://story-t-rpc.noders.services:443 --fees 3000aip \
  --from KEY
```

### Jail reason
```js
story query slashing signing-info $(story tendermint show-validator)
```

### Validator details
```js
story q staking validator $(story keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
story status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
story status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(story tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.story/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(story q staking validator $(story keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(story status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://story-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001aip\"/" ~/.story/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.story/config/config.toml
```

### Reset chain data
```js
story tendermint unsafe-reset-all --keep-addr-book --home ~/.story
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable story
```

### Disable service
```js
sudo systemctl disable story
```

### Start service
```js
sudo systemctl start story
```

### Stop service
```js
sudo systemctl stop story
```

### Restart service
```js
sudo systemctl restart story
```

### Check service status
```js
sudo systemctl status story
```

### Check service logs
```js
sudo journalctl -u story -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop story
sudo systemctl disable story
sudo rm /etc/systemd/system/story.service
sudo systemctl daemon-reload
rm -f $(which story)
rm -rf ~/.story
rm -rf $HOME/story
```