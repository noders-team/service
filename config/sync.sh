#!/bin/bash

#####################################################################################################################################################################
#                                                                    GATHER BLOCKCHAIN DATA                                                                         #
#####################################################################################################################################################################

function readBlockchainConfig {
  # Blockchain
  CHAIN_NAME=$(grep -oE '^CHAIN_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DESCRIPTION=$(grep -oE '^CHAIN_DESCRIPTION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_SYSTEM_NAME=$(grep -oE '^CHAIN_SYSTEM_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
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

  # Social
  SOCIAL_WEBSITE=$(grep -oE '^SOCIAL_WEBSITE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_GITHUB=$(grep -oE '^SOCIAL_GITHUB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_DISCORD=$(grep -oE '^SOCIAL_DISCORD=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_X=$(grep -oE '^SOCIAL_X=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_TELEGRAM=$(grep -oE '^SOCIAL_TELEGRAM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Download
  DOWNLOAD_URL=$(grep -oE '^DOWNLOAD_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Updates
  UPDATE_LIVE_PEERS=$(grep -oE '^UPDATE_LIVE_PEERS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_SNAPSHOT=$(grep -oE '^UPDATE_SNAPSHOT=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CLI_CHEATSHEET=$(grep -oE '^UPDATE_CLI_CHEATSHEET=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
}

function enrichBlockchainConfig {
  # enrich chain id
  if [ "${CHAIN_ID}" == "auto" ]; then
    CHAIN_ID=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.network')
  fi

  # enrich endpoint peer
  if [ "${ENDPOINT_PEER}" == "auto" ]; then
    peer_id=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.default_node_id')
    peer_address=$(echo ${ENDPOINT_RPC} | sed -e "s/https\:\/\///")
    peer_addr=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.listen_addr' | sed -e "s/tcp\:\/\/0\.0\.0\.0\://")
    ENDPOINT_PEER="${peer_id}@${peer_address}:${peer_addr}"
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

  # Social
  sed -i '' "s|\[SOCIAL_WEBSITE\]|${SOCIAL_WEBSITE}|g" $1
  sed -i '' "s|\[SOCIAL_GITHUB\]|${SOCIAL_GITHUB}|g" $1
  sed -i '' "s|\[SOCIAL_DISCORD\]|${SOCIAL_DISCORD}|g" $1
  sed -i '' "s|\[SOCIAL_X\]|${SOCIAL_X}|g" $1
  sed -i '' "s|\[SOCIAL_TELEGRAM\]|${SOCIAL_TELEGRAM}|g" $1

  # Download
  sed -i '' "s|\[DOWNLOAD_URL\]|${DOWNLOAD_URL}|g" $1

  # Updates
  sed -i '' "s|\[UPDATE_SNAPSHOT\]|${UPDATE_SNAPSHOT}|g" $1
  sed -i '' "s|\[UPDATE_LIVE_PEERS\]|${UPDATE_LIVE_PEERS}|g" $1
  sed -i '' "s|\[UPDATE_CLI_CHEATSHEET\]|${UPDATE_CLI_CHEATSHEET}|g" $1
}

#####################################################################################################################################################################
#                                                                          UPDATE PAGES                                                                             #
#####################################################################################################################################################################

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

    # Update page
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/live-peers.md"
    cp "../docs/mainnet-networks/template/live-peers.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshot {
  # Live peers
  LIVE_PEERS_COUNT=""
  LIVE_PEERS_ALL=""
  LIVE_PEERS_RANDOM=""

  if [ "$UPDATE_SNAPSHOT" = true ] ; then
    # Update page
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.md"
    cp "../docs/mainnet-networks/template/snapshot.md" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateCLICheatsheet {
  if [ "$UPDATE_CLI_CHEATSHEET" = true ] ; then
    # Update page
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

  updateSnapshot
  updateLivePeers
  updateCLICheatsheet

  #echo ${LIVE_PEERS_RANDOM}
done
