#!/bin/bash

# stop the script if errors occur
set -e
set -o pipefail

LOG_FILE="/home/services/update_and_deploy.log"
LOG_FILE_MAX_SIZE=10485760  # 10MB in bytes
LOG_BACKUP_FILE="/home/services/update_and_deploy.log.backup"

SERVICES_REPO_PATH="$HOME/service"
SERVICES_CONFIG_PATH="$SERVICES_REPO_PATH/config"
TEMP_DEPLOY_DIR="$HOME/TEMP_DEPLOY_DIR"
DEPLOY_DIR="/var/www/services"
DEPLOY_BACKUP_DIR="/bkp/services_backup"

check_log_size_and_rotate() {
    if [ -f "$LOG_FILE" ]; then
        LOG_FILE_SIZE=$(stat -c%s "$LOG_FILE")
        if [ "$LOG_FILE_SIZE" -gt "$LOG_FILE_MAX_SIZE" ]; then
            if [ -f "$LOG_BACKUP_FILE" ]; then
                rm "$LOG_BACKUP_FILE"
            fi
            mv "$LOG_FILE" "$LOG_BACKUP_FILE"
            touch "$LOG_FILE"
        fi
    fi
}

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

check_log_size_and_rotate

log "------- Starting update and deploy -------"

# Backup current version
log "Backing up current version..."
rm -rf "$DEPLOY_BACKUP_DIR"
cp -r "$DEPLOY_DIR" "$DEPLOY_BACKUP_DIR"

log "Services repo path: $SERVICES_REPO_PATH"
log "Deploy dir: $DEPLOY_DIR"

log "Fetching latest code..."
if [ -d "$SERVICES_REPO_PATH/.git" ]; then
	cd "$SERVICES_REPO_PATH"
	git fetch --all 2>&1 | tee -a "$LOG_FILE"
	git reset --hard origin/main 2>&1 | tee -a "$LOG_FILE"
	git checkout main 2>&1 | tee -a "$LOG_FILE"
else
	git clone git@github.com:noders-team/service.git && cd "$SERVICES_REPO_PATH" && git checkout main 2>&1 | tee -a "$LOG_FILE"
fi

log "Starting sync process..."
cd $SERVICES_CONFIG_PATH
bash sync.sh 2>&1 | tee -a "$LOG_FILE"

cd "$SERVICES_REPO_PATH"

log "Building static files..."
yarn install
yarn build || {
	log "Build failed! Rolling back..."
	rm -rf "$DEPLOY_DIR"
        cp -r "$DEPLOY_BACKUP_DIR" "$DEPLOY_DIR"
	exit 1
    }

log "Update static files with zero downtime..."
mkdir -p $TEMP_DEPLOY_DIR
cp -r build/* $TEMP_DEPLOY_DIR

sudo mkdir -p $DEPLOY_DIR
sudo rsync -a --delete $TEMP_DEPLOY_DIR/ $DEPLOY_DIR/ 2>&1 | tee -a "$LOG_FILE"
rm -rf $TEMP_DEPLOY_DIR

log "Deployed successfully."
