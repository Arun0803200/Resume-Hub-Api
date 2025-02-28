#!/bin/bash
# This file is OS independent
# npm run migration MigrationName --> For Create Migration

echo "Starting migration script..."
migrationName=$1
echo "Migration name: $migrationName"

echo "Current directory: $(pwd)"

npx typeorm migration:create -n $migrationName --dir src/database/Migrations

echo "Migration script completed."
