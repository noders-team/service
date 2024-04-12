---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-band">
# CLI Cheatsheet
</div>
###### Chain ID: `band-laozi-testnet6` | Current Node Version: `v2.5.4`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
bandd keys add KEY
```

### Recover key (via existing mnemonic)
```js
bandd keys add KEY --recover
```

### List all keys
```js
bandd keys list
```

### Delete key
```js
bandd keys delete KEY
```

## Wallet
### Wallet balance
```js
bandd q bank balances $(bandd keys show KEY -a) --node https://band-t-rpc.noders.services:443
```

### Send
```js
bandd tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uband \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

### Withdraw rewards from all validators
```js
bandd tx distribution withdraw-all-rewards \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

### Withdraw Rewards including Commission
```js
bandd tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

### Delegate tokens to yourself
```js
bandd tx staking delegate $(bandd keys show KEY --bech val -a) 1000000uband \
--chain-id band-laozi-testnet6 \
--node https://band-t-rpc.noders.services:443 --fees 3000uband \
--from KEY
```

### Delegate tokens to validator
```js
bandd tx staking delegate VALIDATOR_ADDRESS 1000000uband \
--chain-id band-laozi-testnet6 \
--node https://band-t-rpc.noders.services:443 --fees 3000uband \
--from KEY
```

### Redelegate tokens to another validator
```js
bandd tx staking redelegate $(bandd keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uband \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

### Unbond tokens from your validator
```js
bandd tx staking unbond $(bandd keys show KEY --bech val -a) uband \
  --chain-id andromeda-1 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

## Governance
### List of all proposals
```js
bandd query gov proposals --node https://band-t-rpc.noders.services:443
```
### Check vote
```js
bandd query gov proposal PROPOSAL_NUMBER \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
bandd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
bandd tx staking create-validator \
  --amount 1000000uband \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(bandd tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

### Edit validator
```js
bandd tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id band-laozi-testnet6 \
--commission-rate 0.05 \
--from KEY \
--node https://band-t-rpc.noders.services:443 --fees 3000uband \
```

### Unjail
```js
bandd tx slashing unjail \
  --chain-id band-laozi-testnet6 \
  --node https://band-t-rpc.noders.services:443 --fees 3000uband \
  --from KEY
```

### Jail reason
```js
bandd query slashing signing-info $(bandd tendermint show-validator)
```

### Validator details
```js
bandd q staking validator $(bandd keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
bandd status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
bandd status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(bandd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.band/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(bandd q staking validator $(bandd keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(bandd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://band-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uband\"/" ~/.band/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.band/config/config.toml
```

### Reset chain data
```js
bandd tendermint unsafe-reset-all --keep-addr-book --home ~/.band
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable bandd
```

### Disable service
```js
sudo systemctl disable bandd
```

### Start service
```js
sudo systemctl start bandd
```

### Stop service
```js
sudo systemctl stop bandd
```

### Restart service
```js
sudo systemctl restart bandd
```

### Check service status
```js
sudo systemctl status bandd
```

### Check service logs
```js
sudo journalctl -u bandd -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop bandd
sudo systemctl disable bandd
sudo rm /etc/systemd/system/band.service
sudo systemctl daemon-reload
rm -f $(which bandd)
rm -rf ~/.band
rm -rf $HOME/chain
```
