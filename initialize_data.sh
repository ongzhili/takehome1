#!/bin/bash

# --- Configuration ---
# 1. Path to the directory you are mounting on the host
HOST_STORAGE_DIR="./storage"
# 2. Path to the data file within that directory
HOST_DATA_FILE="$HOST_STORAGE_DIR/data.json"

# --- Step 1: Ensure the storage directory exists ---
if [ ! -d "$HOST_STORAGE_DIR" ]; then
    echo "Creating host storage directory: $HOST_STORAGE_DIR"
    mkdir -p "$HOST_STORAGE_DIR"
fi

# --- Step 2: Check and create data.json if it doesn't exist ---
if [ ! -f "$HOST_DATA_FILE" ]; then
    echo "Data file $HOST_DATA_FILE not found. Creating empty file."
    # Create an empty JSON object {}
    echo "{}" > "$HOST_DATA_FILE"
fi

# --- Step 3: Run Docker Compose ---
echo "Starting containers..."
docker compose up -d

echo "Initialization and deployment complete."