#!/bin/bash

#####################################################################################################################################################################
#                                                                    GATHER BLOCKCHAIN DATA                                                                         #
#####################################################################################################################################################################

function readBlockchainConfig {
  # App
  CHAIN_NAME=$(grep -oE '^CHAIN_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_SYSTEM_NAME=$(grep -oE '^CHAIN_SYSTEM_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_ICON=$(grep -oE '^CHAIN_ICON=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_BACKGROUND_COLOR=$(grep -oE '^CHAIN_BACKGROUND_COLOR=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Noders
  STAKE_URL=$(grep -oE '^STAKE_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  RESTAKE_URL=$(grep -oE '^RESTAKE_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  VALIDATOR_URL=$(grep -oE '^VALIDATOR_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  EXPLORER_URL=$(grep -oE '^EXPLORER_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  FAUCET_URL=$(grep -oE '^FAUCET_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  APP_URL=$(grep -oE '^APP_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  APP_IMAGE=$(grep -oE '^APP_IMAGE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Blockchain
  CHAIN_ID=$(grep -oE '^CHAIN_ID=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DENOM_PRETTY=$(grep -oE '^CHAIN_DENOM_PRETTY=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_DENOM=$(grep -oE '^CHAIN_DENOM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  CHAIN_FEES=$(grep -oE '^CHAIN_FEES=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Binary
  VERSION=$(grep -oE '^VERSION=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_NAME=$(grep -oE '^DAEMON_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_SERVICE=$(grep -oE '^DAEMON_SERVICE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  DAEMON_HOME=$(grep -oE '^DAEMON_HOME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Endpoints
  ENDPOINT_RPC=$(grep -oE '^ENDPOINT_RPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_API=$(grep -oE '^ENDPOINT_API=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_JRPC=$(grep -oE '^ENDPOINT_JRPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_GRPC=$(grep -oE '^ENDPOINT_GRPC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_PEER=$(grep -oE '^ENDPOINT_PEER=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_COSMOSLIST=$(grep -oE '^ENDPOINT_COSMOSLIST=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  ENDPOINT_SEED=$(grep -oE '^ENDPOINT_SEED=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Social
  SOCIAL_WEBSITE=$(grep -oE '^SOCIAL_WEBSITE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_GITHUB=$(grep -oE '^SOCIAL_GITHUB=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_DISCORD=$(grep -oE '^SOCIAL_DISCORD=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_X=$(grep -oE '^SOCIAL_X=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SOCIAL_TELEGRAM=$(grep -oE '^SOCIAL_TELEGRAM=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Other
  SNAPSHOT_URL=$(grep -oE '^SNAPSHOT_URL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  GITHUB_FOLDER_NAME=$(grep -oE '^GITHUB_FOLDER_NAME=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  LIVE_PEERS_COUNT=""
  LIVE_PEERS_ALL=""
  LIVE_PEERS_RANDOM=""
  TIMESTAMP=""
  SIZE=""
  VERSION_HAND=$(grep -oE '^VERSION_HAND=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Updates
  UPDATE_MAIN=$(grep -oE '^UPDATE_MAIN=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CATEGORY=$(grep -oE '^UPDATE_CATEGORY=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_INSTALL=$(grep -oE '^UPDATE_INSTALL=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_UPGRADE=$(grep -oE '^UPDATE_UPGRADE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_SNAPSHOT=$(grep -oE '^UPDATE_SNAPSHOT=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_STATESYNC=$(grep -oE '^UPDATE_STATESYNC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_LIVE_PEERS=$(grep -oE '^UPDATE_LIVE_PEERS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_CLI_CHEATSHEET=$(grep -oE '^UPDATE_CLI_CHEATSHEET=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  UPDATE_ENDPOINTS=$(grep -oE '^UPDATE_ENDPOINTS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')

  # Feature toggles
  SHOW_INSTALLATION_GUIDE=$(grep -oE '^SHOW_INSTALLATION_GUIDE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_UPGRADE_GUIDE=$(grep -oE '^SHOW_UPGRADE_GUIDE=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_GENESIS=$(grep -oE '^SHOW_GENESIS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_CLI=$(grep -oE '^SHOW_CLI=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_ENDPOINTS=$(grep -oE '^SHOW_ENDPOINTS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_STATE_SYNC=$(grep -oE '^SHOW_STATE_SYNC=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_SNAPSHOT=$(grep -oE '^SHOW_SNAPSHOT=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_LIVE_PEERS=$(grep -oE '^SHOW_LIVE_PEERS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_SEED=$(grep -oE '^SHOW_SEED=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_ADDRESS_BOOK=$(grep -oE '^SHOW_ADDRESS_BOOK=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_EXPLORERS_LIST=$(grep -oE '^SHOW_EXPLORERS_LIST=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_PUBLIC_ENDPOINTS=$(grep -oE '^SHOW_PUBLIC_ENDPOINTS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_USEFUL_TOOLS=$(grep -oE '^SHOW_USEFUL_TOOLS=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
  SHOW_UPGRADE_WATCHER=$(grep -oE '^SHOW_UPGRADE_WATCHER=.*' "${config_file}" | cut -d"=" -f2- | tr -d '"')
}

function enrichBlockchainConfig {
  # Temporary variables to store current values
  local current_chain_id="${CHAIN_ID}"
  local current_version="${VERSION}"

  echo "Initial CHAIN_ID: ${CHAIN_ID}"
  echo "Initial VERSION: ${VERSION}"

  # Enrich chain id
  if [ "${CHAIN_ID}" == "auto" ]; then
    new_chain_id=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.network')
    echo "Fetched new_chain_id: ${new_chain_id}"
    if [[ -n "${new_chain_id}" && "${new_chain_id}" != "auto" ]]; then
      CHAIN_ID="${new_chain_id}"
    else
      CHAIN_ID="${current_chain_id}"
    fi
  fi

  echo "Updated CHAIN_ID: ${CHAIN_ID}"

  # Enrich endpoint peer
  if [ "${ENDPOINT_PEER}" == "auto" ]; then
    peer_id=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.default_node_id')
    peer_address=$(echo ${ENDPOINT_RPC} | sed -e "s/https\:\/\///")
    peer_addr=$(curl -s "${ENDPOINT_API}/cosmos/base/tendermint/v1beta1/node_info" | jq -r '.default_node_info.listen_addr' | sed -e 's/.*://')
    ENDPOINT_PEER="${peer_id}@${peer_address}:${peer_addr}"
  fi
  if [ -z "${ENDPOINT_SEED}" ]; then
    ENDPOINT_SEED=${ENDPOINT_PEER}
  fi

  echo "Updated ENDPOINT_PEER: ${ENDPOINT_PEER}"

  # Enrich binary version
  if [ "${VERSION}" == "auto" ]; then
    new_version=$(curl -s "${ENDPOINT_RPC}/abci_info?" | jq -r '.result.response.version' | tr -d '"')
    echo "Fetched new_version: ${new_version}"
    if [[ -n "${new_version}" && "${new_version}" != "null" && "${new_version}" != "auto" ]]; then
      VERSION="${new_version}"
    elif [ -n "${VERSION_HAND}" ]; then
      VERSION="${VERSION_HAND}"
    else
      VERSION="${current_version}"
    fi
  fi

  # Ensure the version starts with "v"
  if [[ ! ${VERSION} == v* && ${VERSION} =~ ^[0-9]+(\.[0-9]+)*$ ]]; then
    VERSION="v${VERSION}"
  fi

  echo "Updated VERSION: ${VERSION}"

  # Enrich github
  if [ "${GITHUB_FOLDER_NAME}" == "auto" ]; then
    GITHUB_FOLDER_NAME=$(echo "${SOCIAL_GITHUB##*/}")
  fi

  echo "Updated GITHUB_FOLDER_NAME: ${GITHUB_FOLDER_NAME}"
}


function escapeSpecialChars {
  echo "$1" | sed 's/[&/\]/\\&/g' | sed 's|#|\\#|g'
}

function replacePageVariables {
  # Detect OS and set sed command accordingly
  if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_CMD="sed -i ''"
  else
    SED_CMD="sed -i"
  fi

  # App
  $SED_CMD "s|\[CHAIN_NAME\]|${CHAIN_NAME}|g" "$1"
  $SED_CMD "s|\[CHAIN_SYSTEM_NAME\]|${CHAIN_SYSTEM_NAME}|g" "$1"
  $SED_CMD "s|\[CHAIN_ICON\]|${CHAIN_ICON}|g" "$1"
  $SED_CMD "s|\[CHAIN_SCOPE\]|${CHAIN_SCOPE}|g" "$1"
  $SED_CMD "s|\[CHAIN_BACKGROUND_COLOR\]|${CHAIN_BACKGROUND_COLOR}|g" "$1"

  # Noders
  escaped_stake_url=$(escapeSpecialChars "${STAKE_URL}")
  $SED_CMD "s|\[STAKE_URL\]|${escaped_stake_url}|g" "$1"
  escaped_restake_url=$(escapeSpecialChars "${RESTAKE_URL}")
  $SED_CMD "s|\[RESTAKE_URL\]|${escaped_restake_url}|g" "$1"
  $SED_CMD "s|\[VALIDATOR_URL\]|${VALIDATOR_URL}|g" "$1"
  $SED_CMD "s|\[EXPLORER_URL\]|${EXPLORER_URL}|g" "$1"
  $SED_CMD "s|\[FAUCET_URL\]|${FAUCET_URL}|g" "$1"
  $SED_CMD "s|\[APP_URL\]|${APP_URL}|g" "$1"
  $SED_CMD "s|\[APP_IMAGE\]|${APP_IMAGE}|g" "$1"

  # Blockchain
  $SED_CMD "s|\[CHAIN_ID\]|${CHAIN_ID}|g" "$1"
  $SED_CMD "s|\[CHAIN_DENOM_PRETTY\]|${CHAIN_DENOM_PRETTY}|g" "$1"
  $SED_CMD "s|\[CHAIN_DENOM\]|${CHAIN_DENOM}|g" "$1"
  $SED_CMD "s|\[CHAIN_FEES\]|${CHAIN_FEES}|g" "$1"

  # Binary
  $SED_CMD "s|\[VERSION\]|${VERSION}|g" "$1"
  $SED_CMD "s|\[DAEMON_NAME\]|${DAEMON_NAME}|g" "$1"
  $SED_CMD "s|\[DAEMON_SERVICE\]|${DAEMON_SERVICE}|g" "$1"
  $SED_CMD "s|\[DAEMON_HOME\]|${DAEMON_HOME}|g" "$1"

  # Endpoints
  $SED_CMD "s|\[ENDPOINT_RPC\]|${ENDPOINT_RPC}|g" "$1"
  $SED_CMD "s|\[ENDPOINT_API\]|${ENDPOINT_API}|g" "$1"
  $SED_CMD "s|\[ENDPOINT_JRPC\]|${ENDPOINT_JRPC}|g" "$1"
  $SED_CMD "s|\[ENDPOINT_GRPC\]|${ENDPOINT_GRPC}|g" "$1"
  $SED_CMD "s|\[ENDPOINT_PEER\]|${ENDPOINT_PEER}|g" "$1"
  $SED_CMD "s|\[ENDPOINT_COSMOSLIST\]|${ENDPOINT_COSMOSLIST}|g" "$1"
  $SED_CMD "s|\[ENDPOINT_SEED\]|${ENDPOINT_SEED}|g" "$1"

  # Social
  $SED_CMD "s|\[SOCIAL_WEBSITE\]|${SOCIAL_WEBSITE}|g" "$1"
  $SED_CMD "s|\[SOCIAL_GITHUB\]|${SOCIAL_GITHUB}|g" "$1"
  $SED_CMD "s|\[SOCIAL_DISCORD\]|${SOCIAL_DISCORD}|g" "$1"
  $SED_CMD "s|\[SOCIAL_X\]|${SOCIAL_X}|g" "$1"
  $SED_CMD "s|\[SOCIAL_TELEGRAM\]|${SOCIAL_TELEGRAM}|g" "$1"

  # Other
  $SED_CMD "s|\[SNAPSHOT_URL\]|${SNAPSHOT_URL}|g" "$1"
  $SED_CMD "s|\[GITHUB_FOLDER_NAME\]|${GITHUB_FOLDER_NAME}|g" "$1"
  $SED_CMD "s|\[LIVE_PEERS_COUNT\]|${LIVE_PEERS_COUNT}|g" "$1"
  $SED_CMD "s|\[LIVE_PEERS_ALL\]|${LIVE_PEERS_ALL}|g" "$1"
  $SED_CMD "s|\[TIMESTAMP\]|${TIMESTAMP}|g" "$1"
  $SED_CMD "s|\[SIZE\]|${SIZE}|g" "$1"
  $SED_CMD "s|\[SNAP_LATEST_BLOCK\]|${SNAP_LATEST_BLOCK}|g" "$1"
  $SED_CMD "s|\[SNAP_ARCHIVE_NAME\]|${SNAP_ARCHIVE_NAME}|g" "$1"
  $SED_CMD "s|\[SNAP_ARCHIVE_LINK\]|${SNAP_ARCHIVE_LINK}|g" "$1"
  $SED_CMD "s@\[SNAP_ARCHIVE_DOWNLOAD_COMMAND\]@${SNAP_ARCHIVE_DOWNLOAD_COMMAND}@g" "$1"
  $SED_CMD "s|\[LIVE_PEERS_RANDOM\]|${LIVE_PEERS_RANDOM}|g" "$1"
  $SED_CMD "s|\[VERSION_HAND\]|${VERSION_HAND}|g" "$1"

  # Feature toggles
  $SED_CMD "s|'\[SHOW_INSTALLATION_GUIDE\]'|${SHOW_INSTALLATION_GUIDE:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_UPGRADE_GUIDE\]'|${SHOW_UPGRADE_GUIDE:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_GENESIS\]'|${SHOW_GENESIS:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_CLI\]'|${SHOW_CLI:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_ENDPOINTS\]'|${SHOW_ENDPOINTS:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_STATE_SYNC\]'|${SHOW_STATE_SYNC:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_SNAPSHOT\]'|${SHOW_SNAPSHOT:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_LIVE_PEERS\]'|${SHOW_LIVE_PEERS:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_SEED\]'|${SHOW_SEED:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_ADDRESS_BOOK\]'|${SHOW_ADDRESS_BOOK:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_EXPLORERS_LIST\]'|${SHOW_EXPLORERS_LIST:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_PUBLIC_ENDPOINTS\]'|${SHOW_PUBLIC_ENDPOINTS:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_USEFUL_TOOLS\]'|${SHOW_USEFUL_TOOLS:-false}|g" "$1"
  $SED_CMD "s|'\[SHOW_UPGRADE_WATCHER\]'|${SHOW_UPGRADE_WATCHER:-false}|g" "$1"
}

#####################################################################################################################################################################
#                                                                          UPDATE MAINNET PAGES                                                                     #
#####################################################################################################################################################################

function updateMain {
  if [ "$UPDATE_MAIN" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}.mdx"
    cp "../docs/mainnet-networks/template.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

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

function updateInstall {
  if [ "$UPDATE_INSTALL" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/install.mdx"
    cp "../docs/mainnet-networks/template/install.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateUpgrade {
  if [ "$UPDATE_UPGRADE" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/upgrade.mdx"
    cp "../docs/mainnet-networks/template/upgrade.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshot {
  if [ "$UPDATE_SNAPSHOT" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.mdx"
    cp "../docs/mainnet-networks/template/snapshot.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateStatesync {
  if [ "$UPDATE_STATESYNC" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/statesync.mdx"
    cp "../docs/mainnet-networks/template/statesync.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateLivePeers {
  if [ "$UPDATE_LIVE_PEERS" = true ]; then
    # Gathering live peers using the new command
    LIVE_PEERS_RAW=$(curl -sS "${ENDPOINT_RPC}:443/net_info" | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}')

    # Variables
    LIVE_PEERS_COUNT=$(echo "${LIVE_PEERS_RAW}" | wc -l)
    LIVE_PEERS_ALL=$(echo "${LIVE_PEERS_RAW}" | paste -sd "," -)
    LIVE_PEERS_RANDOM=$(echo "${LIVE_PEERS_RAW}" | sort --random-sort | head -n 5 | paste -sd "," -)

    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/seeds-and-peers.mdx"
    cp "../docs/mainnet-networks/template/seeds-and-peers.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshotInfo {
  # Get the actual filename from the directory listing
  local filename
  filename=$(curl -s "https://snapshots.noders.services/${CHAIN_SYSTEM_NAME}/" | grep -o "\"${CHAIN_SYSTEM_NAME}.*.tar.lz4\"" | tail -n1 | cut -d "\"" -f2)
  local url="https://snapshots.noders.services/${CHAIN_SYSTEM_NAME}/${filename}"

  # Fetching the headers for the snapshot URL
  local headers
  headers=$(curl -sI "${url}")

  # Extracting TIMESTAMP
  local timestamp
  timestamp=$(echo "${headers}" | grep -i '^Last-Modified:' | cut -d' ' -f2- | tr -d '\r')

  # Extracting SIZE and converting it to GB
  local size_raw
  size_raw=$(echo "${headers}" | awk 'BEGIN { FS=": " } tolower($1) == "content-length" { print $2 }')
  local size_gb
  size_gb=$(awk "BEGIN {printf \"%.2f\", ${size_raw}/(1024*1024*1024)}")

  # Assigning the extracted values to the global variables
  if [ -z "${timestamp}" ]; then
    TIMESTAMP="-"
  else
    TIMESTAMP="${timestamp}"
  fi

  if [ -z "${size_gb}" ]; then
    SIZE="-"
  else
    SIZE="${size_gb} GB"
  fi

  if [ -z "${filename}" ]; then
    SNAP_LATEST_BLOCK="-"
    SNAP_ARCHIVE_NAME="${CHAIN_SYSTEM_NAME}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="Snapshot is not available"
  else
    SNAP_LATEST_BLOCK="$(echo "${filename}" | grep -o "[[:digit:]]*" | head -n 1)"
    SNAP_ARCHIVE_NAME="${filename}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="curl -o - -L ${url} | lz4 -d | tar -x -C ${DAEMON_HOME}"
  fi

  SNAP_ARCHIVE_LINK="${url}"

  CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.mdx"
  cp "../docs/mainnet-networks/template/snapshot.mdx" "${CHAIN_PAGE_PATH}"
  echo "${CHAIN_PAGE_PATH}"

  replacePageVariables "${CHAIN_PAGE_PATH}"
}

function updateCLICheatsheet {
  if [ "$UPDATE_CLI_CHEATSHEET" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/cli-cheatsheet.mdx"
    cp "../docs/mainnet-networks/template/cli-cheatsheet.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateEndpoints {
  if [ "$UPDATE_ENDPOINTS" = true ] ; then
    CHAIN_PAGE_PATH="../docs/mainnet-networks/${CHAIN_SYSTEM_NAME}/endpoints.mdx"
    cp "../docs/mainnet-networks/template/endpoints.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}


#####################################################################################################################################################################
#                                                                              INSTALL MAINNET                                                                      #
#####################################################################################################################################################################
CHAIN_SCOPE=mainnet
for config_file in "mainnet-networks"/*
do
  echo "${config_file}"
  readBlockchainConfig "${config_file}"
  enrichBlockchainConfig

  updateMain
  updateCategory
  updateInstall
  updateUpgrade
  updateSnapshot
  updateStatesync
  updateSnapshotInfo
  updateLivePeers
  updateCLICheatsheet
  updateEndpoints
done

#####################################################################################################################################################################
#                                                                          UPDATE TESTNET PAGES                                                                             #
#####################################################################################################################################################################

function updateMain {
  if [ "$UPDATE_MAIN" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}.mdx"
    cp "../docs/testnet-networks/template.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateCategory {
  if [ "$UPDATE_CATEGORY" = true ] ; then
    mkdir -p "../docs/testnet-networks/${CHAIN_SYSTEM_NAME}"
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/_category_.json"
    cp "../docs/testnet-networks/template/_category_.json" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateInstall {
  if [ "$UPDATE_INSTALL" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/install.mdx"
    cp "../docs/testnet-networks/template/install.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateUpgrade {
  if [ "$UPDATE_UPGRADE" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/upgrade.mdx"
    cp "../docs/testnet-networks/template/upgrade.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshot {
  if [ "$UPDATE_SNAPSHOT" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.mdx"
    cp "../docs/testnet-networks/template/snapshot.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateStatesync {
  if [ "$UPDATE_STATESYNC" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/statesync.mdx"
    cp "../docs/testnet-networks/template/statesync.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateLivePeers {
  if [ "$UPDATE_LIVE_PEERS" = true ]; then
    # Gathering live peers using the new command
    LIVE_PEERS_RAW=$(curl -sS "${ENDPOINT_RPC}:443/net_info" | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}')

    # Variables
    LIVE_PEERS_COUNT=$(echo "${LIVE_PEERS_RAW}" | wc -l)
    LIVE_PEERS_ALL=$(echo "${LIVE_PEERS_RAW}" | paste -sd "," -)
    LIVE_PEERS_RANDOM=$(echo "${LIVE_PEERS_RAW}" | sort --random-sort | head -n 5 | paste -sd "," -)

    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/seeds-and-peers.mdx"
    cp "../docs/testnet-networks/template/seeds-and-peers.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateSnapshotInfo {
  # Get the actual filename from the directory listing
  local filename
  filename=$(curl -s "https://snapshots-t.noders.services/${CHAIN_SYSTEM_NAME}/" | grep -o "\"${CHAIN_SYSTEM_NAME}.*.tar.lz4\"" | tail -n1 | cut -d "\"" -f2)
  local url="https://snapshots-t.noders.services/${CHAIN_SYSTEM_NAME}/${filename}"

  # Fetching the headers for the snapshot URL
  local headers
  headers=$(curl -sI "${url}")

  # Extracting TIMESTAMP
  local timestamp
  timestamp=$(echo "${headers}" | grep -i '^Last-Modified:' | cut -d' ' -f2- | tr -d '\r')

  # Extracting SIZE and converting it to GB
  local size_raw
  size_raw=$(echo "${headers}" | awk 'BEGIN { FS=": " } tolower($1) == "content-length" { print $2 }')
  local size_gb
  size_gb=$(awk "BEGIN {printf \"%.2f\", ${size_raw}/(1024*1024*1024)}")

  # Assigning the extracted values to the global variables
  if [ -z "${timestamp}" ]; then
    TIMESTAMP="-"
  else
    TIMESTAMP="${timestamp}"
  fi

  if [ -z "${size_gb}" ]; then
    SIZE="-"
  else
    SIZE="${size_gb} GB"
  fi

  if [ -z "${filename}" ]; then
    SNAP_LATEST_BLOCK="-"
    SNAP_ARCHIVE_NAME="${CHAIN_SYSTEM_NAME}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="Snapshot is not available"
  else
    SNAP_LATEST_BLOCK="$(echo "${filename}" | grep -o "[[:digit:]]*" | head -n 1)"
    SNAP_ARCHIVE_NAME="${filename}"
    SNAP_ARCHIVE_DOWNLOAD_COMMAND="curl -o - -L ${url} | lz4 -d | tar -x -C ${DAEMON_HOME}"
  fi

  SNAP_ARCHIVE_LINK="${url}"

  CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/snapshot.mdx"
  cp "../docs/testnet-networks/template/snapshot.mdx" "${CHAIN_PAGE_PATH}"
  echo "${CHAIN_PAGE_PATH}"

  replacePageVariables "${CHAIN_PAGE_PATH}"
}

function updateCLICheatsheet {
  if [ "$UPDATE_CLI_CHEATSHEET" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/cli-cheatsheet.mdx"
    cp "../docs/testnet-networks/template/cli-cheatsheet.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

function updateEndpoints {
  if [ "$UPDATE_ENDPOINTS" = true ] ; then
    CHAIN_PAGE_PATH="../docs/testnet-networks/${CHAIN_SYSTEM_NAME}/endpoints.mdx"
    cp "../docs/testnet-networks/template/endpoints.mdx" "${CHAIN_PAGE_PATH}"
    echo "${CHAIN_PAGE_PATH}"

    replacePageVariables "${CHAIN_PAGE_PATH}"
  fi
}

#####################################################################################################################################################################
#                                                                              INSTALL TESTNET                                                                      #
#####################################################################################################################################################################
CHAIN_SCOPE=testnet
for config_file in "testnet-networks"/*
do
  echo "${config_file}"
  readBlockchainConfig "${config_file}"
  enrichBlockchainConfig

  updateMain
  updateCategory
  updateInstall
  updateUpgrade
  updateSnapshot
  updateStatesync
  updateSnapshotInfo
  updateLivePeers
  updateCLICheatsheet
  updateEndpoints
done
