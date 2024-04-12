---
hide_table_of_contents: false
title: CLI Cheatsheet
sidebar_position: 8
---

<div class="h1-with-icon icon-berachain">
# CLI Cheatsheet
</div>
###### Chain ID: `artio-80085` | Current Node Version: `v0.2.3-alpha-rc7`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

## Wallet generate and recover
### Add new key
```js
berad keys add KEY
```

### Recover key (via existing mnemonic)
```js
berad keys add KEY --recover
```

### List all keys
```js
berad keys list
```

### Delete key
```js
berad keys delete KEY
```

## Wallet
### Wallet balance
```js
berad q bank balances $(berad keys show KEY -a) --node https://berachain-t-rpc.noders.services:443
```

### Send
```js
berad tx bank send YOUR_KEY RECEIVER_ADDRESS 1000000uabgt \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

### Withdraw rewards from all validators
```js
berad tx distribution withdraw-all-rewards \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

### Withdraw Rewards including Commission
```js
berad tx distribution withdraw-rewards VALIDATOR_ADRESS \
  --commission \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

### Delegate tokens to yourself
```js
berad tx staking delegate $(berad keys show KEY --bech val -a) 1000000uabgt \
--chain-id artio-80085 \
--node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
--from KEY
```

### Delegate tokens to validator
```js
berad tx staking delegate VALIDATOR_ADDRESS 1000000uabgt \
--chain-id artio-80085 \
--node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
--from KEY
```

### Redelegate tokens to another validator
```js
berad tx staking redelegate $(berad keys show KEY --bech val -a) VALIDATOR_ADDRESS 1000000uabgt \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

### Unbond tokens from your validator
```js
berad tx staking unbond $(berad keys show KEY --bech val -a) uabgt \
  --chain-id andromeda-1 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

## Governance
### List of all proposals
```js
berad query gov proposals --node https://berachain-t-rpc.noders.services:443
```
### Check vote
```js
berad query gov proposal PROPOSAL_NUMBER \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --output json | jq
```

### Vote
#### Vote options:
* yes
* no
* no_with_veto
* abstain
```js
berad tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

## Validator management
### Create Validator
:::note
We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
:::
```js
berad tx staking create-validator \
  --amount 1000000uabgt \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$(berad tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

### Edit validator
```js
berad tx staking edit-validator \
--new-moniker "YOUR_MONIKER_NAME" \
--identity "YOUR_KEYBASE_ID" \
--details "YOUR_DETAILS" \
--website "YOUR_WEBSITE_URL" \
--chain-id artio-80085 \
--commission-rate 0.05 \
--from KEY \
--node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
```

### Unjail
```js
berad tx slashing unjail \
  --chain-id artio-80085 \
  --node https://berachain-t-rpc.noders.services:443 --fees 3000uabgt \
  --from KEY
```

### Jail reason
```js
berad query slashing signing-info $(berad tendermint show-validator)
```

### Validator details
```js
berad q staking validator $(berad keys show KEY --bech val -a)
```

## Maintenance
### Get validator info
```js
berad status 2>&1 | jq .ValidatorInfo
```

### Get sync info
```js
berad status 2>&1 | jq .SyncInfo
```

### Get node peer
```js
echo $(berad tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat ~/.berad/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check if validator key is correct
```js
[[ $(berad q staking validator $(berad keys show KEY --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(berad status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get live peers
```js
curl -sS https://berachain-t-rpc.noders.services:443/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Set minimum gas price
```js
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.001uabgt\"/" ~/.berad/config/app.toml
```

###Enable prometheus
```js
sed -i -e "s/prometheus = false/prometheus = true/" ~/.berad/config/config.toml
```

### Reset chain data
```js
berad tendermint unsafe-reset-all --keep-addr-book --home ~/.berad
```

## Service Management
### Reload service configuration
```js
sudo systemctl daemon-reload
```

### Enable service
```js
sudo systemctl enable berad
```

### Disable service
```js
sudo systemctl disable berad
```

### Start service
```js
sudo systemctl start berad
```

### Stop service
```js
sudo systemctl stop berad
```

### Restart service
```js
sudo systemctl restart berad
```

### Check service status
```js
sudo systemctl status berad
```

### Check service logs
```js
sudo journalctl -u berad -f --no-hostname -o cat
```

## Remove node
```js
cd $HOME
sudo systemctl stop berad
sudo systemctl disable berad
sudo rm /etc/systemd/system/bera.service
sudo systemctl daemon-reload
rm -f $(which berad)
rm -rf ~/.berad
rm -rf $HOME/berachain
```
