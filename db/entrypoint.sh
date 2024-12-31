#!/bin/sh
# entrypoint.sh
# Run Microsoft SQL Server and initialization script (at the same time)

/app/run-init.sh & /opt/mssql/bin/sqlservr


