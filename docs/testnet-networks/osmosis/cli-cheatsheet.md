---
hide_table_of_contents: false
title: CLI Cheatsheet*
sidebar_position: 7
---

<div class="h1-with-icon icon-osmosis">
# CLI Cheatsheet
</div>
###### Chain ID: `osmosis-1` | Current Node Version: `v23.0.0`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

### Bank: Send
```bash
osmosisd tx bank send KEY RECEIVER_ADDRESS 1000000uosmo \
  --chain-id osmosis-1 \
  --node https://osmosis.rpc.mainnet.noders.team:443 --fees 3000uosmo \
  --from KEY
```

### Distribution: Withdraw Rewards including Commission
```bash
osmosisd tx distribution withdraw-rewards VALIDATOR_OPERATOR \
  --commission \
  --chain-id osmosis-1 \
  --node https://osmosis.rpc.mainnet.noders.team:443 --fees 3000uosmo \
  --from KEY
```

### Gov: Query Proposal
```bash
osmosisd query gov proposal PROPOSAL_NUMBER \
  --chain-id osmosis-1 \
  --node https://osmosis.rpc.mainnet.noders.team:443 --fees 3000uosmo \
  --output json | jq
```

### Gov: Vote
###### VOTE_OPTION: `yes`, `no`, `no_with_veto` and `abstain`.
```bash
osmosisd tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id osmosis-1 \
  --node https://osmosis.rpc.mainnet.noders.team:443 --fees 3000uosmo \
  --from KEY
```

### Slashing: Unjail
```bash
osmosisd tx slashing unjail \
  --chain-id osmosis-1 \
  --node https://osmosis.rpc.mainnet.noders.team:443 --fees 3000uosmo \
  --from KEY
```

### Staking: Create Validator
###### Note: We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
```bash
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
  --chain-id osmosis-1 \
  --node https://osmosis.rpc.mainnet.noders.team:443 --fees 3000uosmo \
  --from KEY
```