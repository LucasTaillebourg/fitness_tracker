
\c fitness-tracker-bdd;

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO "User" (name, password) VALUES ('utilisateur_exemple', 'mot_de_passe_exemple');



