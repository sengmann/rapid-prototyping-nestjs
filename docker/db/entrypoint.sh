#!/bin/bash
# start db in background to execute query and create db if needed
/opt/mssql/bin/sqlservr &

killAndWait() {
    echo "shutting down process $1"
    kill $1 && tail --pid=$1 -f /dev/null
    echo "finished shutting down $1"
}

echo "Testing if database was created ..."

/opt/mssql-tools/bin/sqlcmd -S localhost -U more -P "s4fePassword" -Q "SELECT 1"
test_query_result=$?


if [[ "$test_query_result" -ne 0 ]]; then
  echo "Create database"
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "s4fePassword" -i /var/opt/mssql/testdata/create_db.sql -r
fi

# kill the background db and start into foreground to keep container alive
killAndWait "$(lsof -i:1433 -t)" && /opt/mssql/bin/sqlservr
