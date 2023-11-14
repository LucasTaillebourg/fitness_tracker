docker cp init.sql fitness-tracker-bdd:/init.sql
docker exec -i fitness-tracker-bdd psql -u root -proot -e 'show databases;'
docker exec -i fitness-tracker-bdd psql -u root -proot -e 'use test;'
docker exec -i fitness-tracker-bdd psql -u root -proot < init.sql
