@REM This file is possible to create migration files in a specific directory only on Windows operating systems
@REM npm run create-migration MigrationName --> For Create Migration
@echo off

set migrationName=%1
typeorm migration:create -n %migrationName% --dir src/database/Migrations
