
\c fitness-tracker-bdd;

CREATE TABLE FITNESS_USER (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);


