---
hide_table_of_contents: false
title: CLI Cheatsheet*
sidebar_position: 7
---

<div class="h1-with-icon icon-[CHAIN_SYSTEM_NAME]">
# CLI Cheatsheet
</div>
###### Chain ID: `[CHAIN_ID]` | Current Node Version: `[DAEMON_VERSION]`

This cheatsheet collects commonly used CLI commands for node operators to easily copy and paste. A few conventions we follow:

- Capitalized words indicate placeholders
- Always use our own [NODERS]TEAM RPC endpoints
- Always specify `--chain-id` and `--node` flags even when they are unnecessary
- Query CLI command always uses `--output json` flag and pipes result through `jq`

### Bank: Send
```bash
[DAEMON_NAME] tx bank send KEY RECEIVER_ADDRESS 1000000[CHAIN_DENOM] \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Distribution: Withdraw Rewards including Commission
```bash
[DAEMON_NAME] tx distribution withdraw-rewards VALIDATOR_OPERATOR \
  --commission \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Gov: Query Proposal
```bash
[DAEMON_NAME] query gov proposal PROPOSAL_NUMBER \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --output json | jq
```

### Gov: Vote
###### VOTE_OPTION: `yes`, `no`, `no_with_veto` and `abstain`.
```bash
[DAEMON_NAME] tx gov vote PROPOSAL_NUMBER VOTE_OPTION \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Slashing: Unjail
```bash
[DAEMON_NAME] tx slashing unjail \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```

### Staking: Create Validator
###### Note: We use example filed values instead of capitalized dummy words for demo purpose in this command. Please make sure to adjust accordingly for your use.
```bash
[DAEMON_NAME] tx staking create-validator \
  --amount 1000000[CHAIN_DENOM] \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$([DAEMON_NAME] tendermint show-validator) \
  --moniker '[NODERS]TEAM SERVICE' \
  --website "https://noders.team" \
  --identity "220491ADDD660741" \
  --details "Trusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id [CHAIN_ID] \
  --node [ENDPOINT_RPC]:443 --fees [CHAIN_FEES][CHAIN_DENOM] \
  --from KEY
```
