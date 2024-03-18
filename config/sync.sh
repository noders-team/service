#!/bin/bash

#####################################################################################################################################################################
#                                                                    GATHER BLOCKCHAIN DATA                                                                         #
#####################################################################################################################################################################

function readBlockchainConfig {
  # Blockchain
  CHAIN_NAME=$(grep -oE '^CHAIN_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_SYSTEM_NAME=$(grep -oE '^CHAIN_SYSTEM_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DESCRIPTION=$(grep -oE '^CHAIN_DESCRIPTION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_ID=$(grep -oE '^CHAIN_ID=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DENOM=$(grep -oE '^CHAIN_DENOM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_FEES=$(grep -oE '^CHAIN_FEES=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Binary
  DAEMON_NAME=$(grep -oE '^DAEMON_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_VERSION=$(grep -oE '^DAEMON_VERSION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_SERVICE=$(grep -oE '^DAEMON_SERVICE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_HOME=$(grep -oE '^DAEMON_HOME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Endpoints
  ENDPOINT_RPC=$(grep -oE '^ENDPOINT_RPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_API=$(grep -oE '^ENDPOINT_API=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_GRPCWEB=$(grep -oE '^ENDPOINT_GRPCWEB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_GRPC=$(grep -oE '^ENDPOINT_GRPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_PEER=$(grep -oE '^ENDPOINT_PEER=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  ENDPOINT_RPC_BLOCK=""
  ENDPOINT_API_BLOCK=""
  ENDPOINT_GRPCWEB_BLOCK=""

  # Social
  SOCIAL_WEBSITE=$(grep -oE '^SOCIAL_WEBSITE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_GITHUB=$(grep -oE '^SOCIAL_GITHUB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_DISCORD=$(grep -oE '^SOCIAL_DISCORD=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_X=$(grep -oE '^SOCIAL_X=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_TELEGRAM=$(grep -oE '^SOCIAL_TELEGRAM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  SOCIAL_TELEGRAM_BLOCK=""

  # Other
  DOWNLOAD_URL=$(grep -oE '^DOWNLOAD_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  GITHUB_FOLDER_NAME=$(grep -oE '^GITHUB_FOLDER_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Updates
  UPDATE_MAIN=$(grep -oE '^UPDATE_MAIN=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CATEGORY=$(grep -oE '^UPDATE_CATEGORY=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_UPGRADE=$(grep -oE '^UPDATE_UPGRADE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_SNAPSHOT=$(grep -oE '^UPDATE_SNAPSHOT=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_STATESYNC=$(grep -oE '^UPDATE_STATESYNC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_LIVE_PEERS=$(grep -oE '^UPDATE_LIVE_PEERS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CLI_CHEATSHEET=$(grep -oE '^UPDATE_CLI_CHEATSHEET=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
}

function enrichBlockchainConfig {
  # Enrich chain id
  if [ "${CHAIN_ID}" == "auto" ]; then
    CHAIN_ID=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.network')
  fi

  # Enrich endpoint peer
  if [ "${ENDPOINT_PEER}" == "auto" ]; then
    peer_id=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.default_node_id')
    peer_address=$(echo ${ENDPOINT_RPC} | sed -e "s/https\:\/\///")
    peer_addr=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.listen_addr' | sed -e "s/tcp\:\/\/0\.0\.0\.0\://")
    ENDPOINT_PEER="${peer_id}@${peer_address}:${peer_addr}"
  fi

  # Enrich github
  if [ "${GITHUB_FOLDER_NAME}" == "auto" ]; then
    GITHUB_FOLDER_NAME=$(echo "${SOCIAL_GITHUB##*/}")
  fi

}

function replacePageVariables {
  # Blockchain
  sed -i '' "s|\[CHAIN_NAME\]|${CHAIN_NAME}|g" $1
  sed -i '' "s|\[CHAIN_SYSTEM_NAME\]|${CHAIN_SYSTEM_NAME}|g" $1
  sed -i '' "s|\[CHAIN_ID\]|${CHAIN_ID}|g" $1
  sed -i '' "s|\[CHAIN_DESCRIPTION\]|${CHAIN_DESCRIPTION}|g" $1
  sed -i '' "s|\[CHAIN_DENOM\]|${CHAIN_DENOM}|g" $1
  sed -i '' "s|\[CHAIN_FEES\]|${CHAIN_FEES}|g" $1

  # Binary
  sed -i '' "s|\[DAEMON_NAME\]|${DAEMON_NAME}|g" $1
  sed -i '' "s|\[DAEMON_VERSION\]|${DAEMON_VERSION}|g" $1
  sed -i '' "s|\[DAEMON_SERVICE\]|${DAEMON_SERVICE}|g" $1
  sed -i '' "s|\[DAEMON_HOME\]|${DAEMON_HOME}|g" $1

  # Endpoints
  sed -i '' "s|\[ENDPOINT_RPC\]|${ENDPOINT_RPC}|g" $1
  sed -i '' "s|\[ENDPOINT_API\]|${ENDPOINT_API}|g" $1
  sed -i '' "s|\[ENDPOINT_GRPCWEB\]|${ENDPOINT_GRPCWEB}|g" $1
  sed -i '' "s|\[ENDPOINT_GRPC\]|${ENDPOINT_GRPC}|g" $1
  sed -i '' "s|\[ENDPOINT_PEER\]|${ENDPOINT_PEER}|g" $1

  sed -i '' "s|\[ENDPOINT_RPC_BLOCK\]|${ENDPOINT_RPC_BLOCK}|g" $1
  sed -i '' "s|\[ENDPOINT_API_BLOCK\]|${ENDPOINT_API_BLOCK}|g" $1
  sed -i '' "s|\[ENDPOINT_GRPCWEB_BLOCK\]|${ENDPOINT_GRPCWEB_BLOCK}|g" $1

  # Social
  sed -i '' "s|\[SOCIAL_WEBSITE\]|${SOCIAL_WEBSITE}|g" $1
  sed -i '' "s|\[SOCIAL_GITHUB\]|${SOCIAL_GITHUB}|g" $1
  sed -i '' "s|\[SOCIAL_DISCORD\]|${SOCIAL_DISCORD}|g" $1
  sed -i '' "s|\[SOCIAL_X\]|${SOCIAL_X}|g" $1
  sed -i '' "s|\[SOCIAL_TELEGRAM\]|${SOCIAL_TELEGRAM}|g" $1

  sed -i '' "s|\[SOCIAL_TELEGRAM_BLOCK\]|${SOCIAL_TELEGRAM_BLOCK}|g" $1

  # Other
  sed -i '' "s|\[DOWNLOAD_URL\]|${DOWNLOAD_URL}|g" $1
  sed -i '' "s|\[GITHUB_FOLDER_NAME\]|${GITHUB_FOLDER_NAME}|g" $1

}

#####################################################################################################################################################################
#                                                                          UPDATE PAGES                                                                             #
#####################################################################################################################################################################

function updateMain {
  if [ "$UPDATE_MAIN" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}.md"
    cp "../docs/mainnet-networks/template.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    # Endpoints
    if [ -n "${ENDPOINT_RPC}" ] ; then
      ENDPOINT_RPC_BLOCK="<SmallCard to=\"${ENDPOINT_RPC}\" header={{label: \"RPC Endpoint\", translateId: \"rpc-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_API}" ] ; then
      ENDPOINT_API_BLOCK="<SmallCard to=\"${ENDPOINT_API}\" header={{label: \"API Endpoint\", translateId: \"api-endpoint\"}}/>"
    fi
    if [ -n "${ENDPOINT_GRPCWEB}" ] ; then
      ENDPOINT_GRPCWEB_BLOCK="<SmallCard to=\"${ENDPOINT_GRPCWEB}\" header={{label: \"gRPC-Web Endpoint\", translateId: \"grpcweb-endpoint\"}}/>"
    fi

    # Social
    if [ -n "${SOCIAL_TELEGRAM}" ] ; then
      SOCIAL_TELEGRAM_BLOCK="<SmallCard to=\"${SOCIAL_TELEGRAM}\" header={{label: \"Telegram\", translateId: \"social-telegram\"}} iconPath="img/typescript-icon.png"/>"
    fi

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateCategory {
  if [ "$UPDATE_CATEGORY" = true ] ; then
    mkdir -p "../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}"
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/_category_.json"
    cp "../docs/mainnet-networks/template/_category_.json" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateUpgrade {
  if [ "$UPDATE_UPGRADE" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/upgrade.md"
    cp "../docs/mainnet-networks/template/upgrade.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshot {
  if [ "$UPDATE_SNAPSHOT" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.md"
    cp "../docs/mainnet-networks/template/snapshot.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateStatesync {
  if [ "$UPDATE_STATESYNC" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/statesync.md"
    cp "../docs/mainnet-networks/template/statesync.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateLivePeers {
  # Live peers
  LIVE_PEERS_COUNT=""
  LIVE_PEERS_ALL=""
  LIVE_PEERS_RANDOM=""

  if [ "$UPDATE_LIVE_PEERS" = true ] ; then
    # Gathering live peers
    LIVE_PEERS_RAW=$(curl -Ls https://snapshots.mainnet.noders.team/osmosis/live_peers.txt)

    # Variables
    LIVE_PEERS_COUNT=$(echo "${LIVE_PEERS_RAW}" | wc -l)
    LIVE_PEERS_ALL=$(echo "${LIVE_PEERS_RAW}" | paste -sd "," -)
    LIVE_PEERS_RANDOM=$(echo "${LIVE_PEERS_RAW}" | sort --random-sort | head -n 5 | paste -sd "," -)

    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"
    cp "../docs/mainnet-networks/template/live-peers.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateCLICheatsheet {
  if [ "$UPDATE_CLI_CHEATSHEET" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/cli-cheatsheet.md"
    cp "../docs/mainnet-networks/template/cli-cheatsheet.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

#####################################################################################################################################################################
#                                                                              INSTALL                                                                              #
#####################################################################################################################################################################
for config_file in "mainnet-networks"/*
do
  echo "${config_file}"
  readBlockchainConfig "${config_file}"
  enrichBlockchainConfig

  updateMain
  updateCategory
  updateUpgrade
  updateSnapshot
  updateStatesync
  updateLivePeers
  updateCLICheatsheet

  #echo ${LIVE_PEERS_RANDOM}
done
