---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-celestia">
# CLI Cheatsheet
</div>
###### Chain ID: `mocha-4` | Current Node Version: `v3.4.2`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
celestia-appd keys add KEY
```

### Recover key (via existing mnemonic)
```js
celestia-appd keys add KEY --recover
```

### List all keys
```js
celestia-appd keys list
```

### Delete key
```js
celestia-appd keys delete KEY
```

## Wallet
### Wallet balance
```js
celestia-appd q bank balances $(celestia-appd keys show KEY -a) --node https://celestia-t-rpc.noders.services:443
```

### Send
```js
celestia-appd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000utia \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

### Withdraw rewards from all validators
```js
celestia-appd tx distribution withdraw-all-rewards \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

### Withdraw Rewards including Commission
```js
celestia-appd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

### Delegate tokens to yourself
```js
celestia-appd tx staking delegate $(celestia-appd keys show KEY --bech val -a) 1000000utia \
--chain-id mocha-4 \
--node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
--from KEY
```

### Delegate tokens to validator
```js
celestia-appd tx staking delegate VALIDATOR_ADDRESS 1000000utia \
--chain-id mocha-4 \
--node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
--from KEY
```

### Redelegate tokens to another validator
```js
celestia-appd tx staking redelegate $(celestia-appd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000utia \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

### Unbond tokens from your validator
```js
celestia-appd tx staking unbond $(celestia-appd keys show KEY --bech val -a) utia \
  --chain-id andromeda-1 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

## Governance
### List of all proposals
```js
celestia-appd query gov proposals --node https://celestia-t-rpc.noders.services:443
```
### Check vote
```js
celestia-appd query gov proposal PROPOSAL_NUMBER \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
celestia-appd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
celestia-appd tx staking create-validator \
  --amount 1000000utia \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(celestia-appd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

### Edit validator
```js
celestia-appd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id mocha-4 \
--commission-rate 0.05 \
--from KEY \
--node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
```

### Unjail
```js
celestia-appd tx slashing unjail \
  --chain-id mocha-4 \
  --node https://celestia-t-rpc.noders.services:443 --fees 20000utia \
  --from KEY
```

### Jail reason
```js
celestia-appd query slashing signing-info $(celestia-appd tendermint show-validator)
```

### Validator details
```js
celestia-appd q staking validator $(celestia-appd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
celestia-appd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
celestia-appd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(celestia-appd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.celestia-app/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(celestia-appd q staking validator $(celestia-appd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(celestia-appd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://celestia-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001utia\"/" ~/.celestia-app/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.celestia-app/config/config.toml
```

### Reset chain data
```js
celestia-appd tendermint unsafe-reset-all --keep-addr-book --home ~/.celestia-app
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable celestia-appd
```

### Disable service
```js
sudo systemctl disable celestia-appd
```

### Start service
```js
sudo systemctl start celestia-appd
```

### Stop service
```js
sudo systemctl stop celestia-appd
```

### Restart service
```js
sudo systemctl restart celestia-appd
```

### Check service status
```js
sudo systemctl status celestia-appd
```

### Check service logs
```js
sudo journalctl -u celestia-appd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop celestia-appd
sudo systemctl disable celestia-appd
sudo rm /etc/systemd/system/celestia.service
sudo systemctl daemon-reload
rm -f $(which celestia-appd)
rm -rf ~/.celestia-app
rm -rf $HOME/celestia-app
```