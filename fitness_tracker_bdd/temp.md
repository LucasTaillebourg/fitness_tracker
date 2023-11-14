docker exec -it fitness-tracker-bdd psql -U Settrak -d fitness-tracker-bdd -a -f /docker-entrypoint-initdb.d/init.sql
