#!/bin/sh
# run-init.sh
# Wait to be sure that SQL Server came up

sleep 90s

echo "Initializing SQL Server Databases"

# Run the setup script to create the DB and the schema in the DB
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -d master -i /app/init.sql -N -C