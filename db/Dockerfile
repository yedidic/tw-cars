# Use the official Microsoft SQL Server image
FROM mcr.microsoft.com/mssql/server 

# Expose the SQL Server port
EXPOSE ${DB_PORT}


COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./run-init.sh /app/run-init.sh
COPY ./init.sql /app/init.sql
CMD /app/entrypoint.sh
