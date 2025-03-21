---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-osmosis">
# CLI Cheatsheet
</div>
###### Chain ID: `osmo-test-5` | Current Node Version: `29.0.0-rc1`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
osmosisd keys add KEY
```

### Recover key (via existing mnemonic)
```js
osmosisd keys add KEY --recover
```

### List all keys
```js
osmosisd keys list
```

### Delete key
```js
osmosisd keys delete KEY
```

## Wallet
### Wallet balance
```js
osmosisd q bank balances $(osmosisd keys show KEY -a) --node https://osmosis-t-rpc.noders.services:443
```

### Send
```js
osmosisd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uosmo \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

### Withdraw rewards from all validators
```js
osmosisd tx distribution withdraw-all-rewards \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

### Withdraw Rewards including Commission
```js
osmosisd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

### Delegate tokens to yourself
```js
osmosisd tx staking delegate $(osmosisd keys show KEY --bech val -a) 1000000uosmo \
--chain-id osmo-test-5 \
--node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
--from KEY
```

### Delegate tokens to validator
```js
osmosisd tx staking delegate VALIDATOR_ADDRESS 1000000uosmo \
--chain-id osmo-test-5 \
--node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
--from KEY
```

### Redelegate tokens to another validator
```js
osmosisd tx staking redelegate $(osmosisd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uosmo \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

### Unbond tokens from your validator
```js
osmosisd tx staking unbond $(osmosisd keys show KEY --bech val -a) uosmo \
  --chain-id andromeda-1 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

## Governance
### List of all proposals
```js
osmosisd query gov proposals --node https://osmosis-t-rpc.noders.services:443
```
### Check vote
```js
osmosisd query gov proposal PROPOSAL_NUMBER \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
osmosisd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
osmosisd tx staking create-validator \
  --amount 1000000uosmo \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(osmosisd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

### Edit validator
```js
osmosisd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id osmo-test-5 \
--commission-rate 0.05 \
--from KEY \
--node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
```

### Unjail
```js
osmosisd tx slashing unjail \
  --chain-id osmo-test-5 \
  --node https://osmosis-t-rpc.noders.services:443 --fees 3000uosmo \
  --from KEY
```

### Jail reason
```js
osmosisd query slashing signing-info $(osmosisd tendermint show-validator)
```

### Validator details
```js
osmosisd q staking validator $(osmosisd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
osmosisd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
osmosisd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(osmosisd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.osmosisd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(osmosisd q staking validator $(osmosisd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(osmosisd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://osmosis-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uosmo\"/" ~/.osmosisd/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.osmosisd/config/config.toml
```

### Reset chain data
```js
osmosisd tendermint unsafe-reset-all --keep-addr-book --home ~/.osmosisd
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable osmosisd
```

### Disable service
```js
sudo systemctl disable osmosisd
```

### Start service
```js
sudo systemctl start osmosisd
```

### Stop service
```js
sudo systemctl stop osmosisd
```

### Restart service
```js
sudo systemctl restart osmosisd
```

### Check service status
```js
sudo systemctl status osmosisd
```

### Check service logs
```js
sudo journalctl -u osmosisd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop osmosisd
sudo systemctl disable osmosisd
sudo rm /etc/systemd/system/osmosisd.service
sudo systemctl daemon-reload
rm -f $(which osmosisd)
rm -rf ~/.osmosisd
rm -rf $HOME/osmosis
```