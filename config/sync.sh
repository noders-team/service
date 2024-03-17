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
    echo "${CHAIN_PAGE_PATH}"
    cp "../docs/mainnet-networks/template/live-peers.md" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[CHAIN_NAME\]/$CHAIN_NAME/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[CHAIN_ID\]/$CHAIN_ID/g" "${CHAIN_PAGE_PATH}"

    perl -pi -e "s/\[DAEMON_NAME\]/$DAEMON_NAME/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[DAEMON_VERSION\]/$DAEMON_VERSION/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[DAEMON_HOME\]/$DAEMON_HOME/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[DAEMON_SERVICE\]/$DAEMON_SERVICE/g" "${CHAIN_PAGE_PATH}"

    perl -pi -e "s/\[LIVE_PEERS_COUNT\]/$LIVE_PEERS_COUNT/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[LIVE_PEERS_ALL\]/$LIVE_PEERS_ALL/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[LIVE_PEERS_RANDOM\]/$LIVE_PEERS_RANDOM/g" "${CHAIN_PAGE_PATH}"
    perl -pi -e "s/\[ENDPOINT_PEER\]/$ENDPOINT_PEER/g" "${CHAIN_PAGE_PATH}"
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

  updateLivePeers

  #echo ${LIVE_PEERS_RANDOM}
done
