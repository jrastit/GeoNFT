#!/bin/bash
if [ "$(whoami)" != "postgres" ]; then
        echo "Script must be run as user: postgres"
        exit 255
fi


psql -p 5434 -c "drop database geonft"
psql -p 5434 -c "create database geonft"
psql -p 5434 -c "grant all privileges on database geonft to geonft"
psql -p 5434 -c "ALTER DATABASE geonft OWNER TO geonft;"
psql -p 5434 -d geonft -c "CREATE EXTENSION IF NOT EXISTS postgis;"
