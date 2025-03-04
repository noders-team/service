---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-empeiria">
# CLI Cheatsheet
</div>
###### Chain ID: `auto` | Current Node Version: `auto`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
emped keys add KEY
```

### Recover key (via existing mnemonic)
```js
emped keys add KEY --recover
```

### List all keys
```js
emped keys list
```

### Delete key
```js
emped keys delete KEY
```

## Wallet
### Wallet balance
```js
emped q bank balances $(emped keys show KEY -a) --node https://empeiria-t-rpc.noders.services:443
```

### Send
```js
emped tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uempe \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

### Withdraw rewards from all validators
```js
emped tx distribution withdraw-all-rewards \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

### Withdraw Rewards including Commission
```js
emped tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

### Delegate tokens to yourself
```js
emped tx staking delegate $(emped keys show KEY --bech val -a) 1000000uempe \
--chain-id auto \
--node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
--from KEY
```

### Delegate tokens to validator
```js
emped tx staking delegate VALIDATOR_ADDRESS 1000000uempe \
--chain-id auto \
--node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
--from KEY
```

### Redelegate tokens to another validator
```js
emped tx staking redelegate $(emped keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uempe \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

### Unbond tokens from your validator
```js
emped tx staking unbond $(emped keys show KEY --bech val -a) uempe \
  --chain-id andromeda-1 \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

## Governance
### List of all proposals
```js
emped query gov proposals --node https://empeiria-t-rpc.noders.services:443
```
### Check vote
```js
emped query gov proposal PROPOSAL_NUMBER \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
emped tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
emped tx staking create-validator \
  --amount 1000000uempe \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(emped tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

### Edit validator
```js
emped tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id auto \
--commission-rate 0.05 \
--from KEY \
--node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
```

### Unjail
```js
emped tx slashing unjail \
  --chain-id auto \
  --node https://empeiria-t-rpc.noders.services:443 --fees 3000uempe \
  --from KEY
```

### Jail reason
```js
emped query slashing signing-info $(emped tendermint show-validator)
```

### Validator details
```js
emped q staking validator $(emped keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
emped status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
emped status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(emped tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.empe-chain/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(emped q staking validator $(emped keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(emped status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://empeiria-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uempe\"/" ~/.empe-chain/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.empe-chain/config/config.toml
```

### Reset chain data
```js
emped tendermint unsafe-reset-all --keep-addr-book --home ~/.empe-chain
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable emped
```

### Disable service
```js
sudo systemctl disable emped
```

### Start service
```js
sudo systemctl start emped
```

### Stop service
```js
sudo systemctl stop emped
```

### Restart service
```js
sudo systemctl restart emped
```

### Check service status
```js
sudo systemctl status emped
```

### Check service logs
```js
sudo journalctl -u emped -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop emped
sudo systemctl disable emped
sudo rm /etc/systemd/system/empeiria.service
sudo systemctl daemon-reload
rm -f $(which emped)
rm -rf ~/.empe-chain
rm -rf $HOME/empe-io
```