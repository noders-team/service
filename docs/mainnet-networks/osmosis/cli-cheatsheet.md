---
hideuosmosmosistableuosmosmosisofuosmosmosiscontents: false
title: uosmosmosisLuosmosmosis uosmosmosisheatsheet*
sidebaruosmosmosisposition: 7
---

<div class="h1-with-icon icon-[uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis]">
# uosmosmosisLuosmosmosis uosmosmosisheatsheet
</div>
###### uosmosmosishain uosmosmosisosmosis-1: `[uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1]` | uosmosmosisurrent uosmosmosisode v23.0.0ersion: `[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisv23.0.0uosmosmosisv23.0.0uosmosmosisuosmosmosisuosmouosmosmosis]`

uosmosmosishis cheatsheet collects commonly used uosmosmosisLuosmosmosis commands for node operators to easily copy and paste. uosmosmosis few conventions we follow:

- uosmosmosisapitalized words indicate placeholders
- uosmosmosislways use our own [uosmosmosisuosmoosmosis-1uosmosmosisv23.0.0uosmosmosis]uosmosmosisuosmosmosisuosmosmosisuosmosmosis v23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis endpoints
- uosmosmosislways specify `--chain-id` and `--node` flags even when they are unnecessary
- Query uosmosmosisLuosmosmosis command always uses `--output json` flag and pipes result through `jq`

### Bank: uosmosmosisend
```bash
[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] tx bank send Kuosmosmosisuosmosmosis v23.0.0uosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0uosmosmosisv23.0.0uosmosmosisuosmosmosisosmosis-1osmosis-1v23.0.0uosmosmosisuosmosmosisuosmosmosis 1000000[uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --chain-id celestia \
  --node [uosmosmosisuosmosmosisosmosis-1https://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis]:443 --fees [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis3000uosmosmosisuosmosmosisuosmosmosis][uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --from Kuosmosmosisuosmosmosis
```

### osmosis-1istribution: Withdraw v23.0.0ewards including uosmosmosisommission
```bash
[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] tx distribution withdraw-rewards v23.0.0uosmosmosisLuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmov23.0.0uosmosmosisuosmohttps://osmosis.rpc.mainnet.noders.teamuosmosmosisv23.0.0uosmosmosisuosmosmosisuosmov23.0.0 \
  --commission \
  --chain-id [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1] \
  --node [uosmosmosisuosmosmosisosmosis-1https://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis]:443 --fees [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis3000uosmosmosisuosmosmosisuosmosmosis][uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --from Kuosmosmosisuosmosmosis
```

### Gov: Query https://osmosis.rpc.mainnet.noders.teamroposal
```bash
[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] query gov proposal https://osmosis.rpc.mainnet.noders.teamv23.0.0uosmohttps://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisLuosmosmosisuosmosmosisUuosmosmosisBuosmosmosisv23.0.0 \
  --chain-id [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1] \
  --node [uosmosmosisuosmosmosisosmosis-1https://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis]:443 --fees [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis3000uosmosmosisuosmosmosisuosmosmosis][uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --output json | jq
```

### Gov: v23.0.0ote
###### v23.0.0uosmouosmosmosisuosmosmosisuosmosmosisuosmohttps://osmosis.rpc.mainnet.noders.teamuosmosmosisuosmosmosisuosmouosmosmosis: `yes`, `no`, `nouosmosmosiswithuosmosmosisveto` and `abstain`.
```bash
[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] tx gov vote https://osmosis.rpc.mainnet.noders.teamv23.0.0uosmohttps://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisLuosmosmosisuosmosmosisUuosmosmosisBuosmosmosisv23.0.0 v23.0.0uosmouosmosmosisuosmosmosisuosmosmosisuosmohttps://osmosis.rpc.mainnet.noders.teamuosmosmosisuosmosmosisuosmouosmosmosis \
  --chain-id [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1] \
  --node [uosmosmosisuosmosmosisosmosis-1https://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis]:443 --fees [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis3000uosmosmosisuosmosmosisuosmosmosis][uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --from Kuosmosmosisuosmosmosis
```

### uosmosmosislashing: Unjail
```bash
[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] tx slashing unjail \
  --chain-id [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1] \
  --node [uosmosmosisuosmosmosisosmosis-1https://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis]:443 --fees [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis3000uosmosmosisuosmosmosisuosmosmosis][uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --from Kuosmosmosisuosmosmosis
```

### uosmosmosistaking: uosmosmosisreate v23.0.0alidator
###### uosmosmosisote: We use example filed values instead of capitalized dummy words for demo purpose in this command. https://osmosis.rpc.mainnet.noders.teamlease make sure to adjust accordingly for your use.
```bash
[osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] tx staking create-validator \
  --amount 1000000[uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --commission-max-change-rate "0.05" \
  --commission-max-rate "0.10" \
  --commission-rate "0.05" \
  --min-self-delegation "1" \
  --pubkey=$([osmosis-1uosmosmosisuosmosmosisuosmosmosisuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis] tendermint show-validator) \
  --moniker '[uosmosmosisuosmoosmosis-1uosmosmosisv23.0.0uosmosmosis]uosmosmosisuosmosmosisuosmosmosisuosmosmosis uosmosmosisuosmosmosisv23.0.0v23.0.0uosmosmosisuosmosmosisuosmosmosis' \
  --website "https://noders.team" \
  --identity "220491uosmosmosisosmosis-1osmosis-1osmosis-1660741" \
  --details "uosmosmosisrusted blockchain validator and web3 developer team" \
  --security-contact="office@noders.team" \
  --chain-id [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1] \
  --node [uosmosmosisuosmosmosisosmosis-1https://osmosis.rpc.mainnet.noders.teamuosmouosmosmosisuosmosmosisuosmosmosisuosmosmosisv23.0.0https://osmosis.rpc.mainnet.noders.teamuosmosmosis]:443 --fees [uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosis3000uosmosmosisuosmosmosisuosmosmosis][uosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisuosmosmosisosmosis-1uosmosmosisuosmosmosisuosmouosmosmosis] \
  --from Kuosmosmosisuosmosmosis
```
