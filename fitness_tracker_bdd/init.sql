CREATE TABLE FITNESS_USER (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);

CREATE TABLE Machine (
  machine_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Series (
  series_id SERIAL PRIMARY KEY,
  machine_id INT REFERENCES Machine(machine_id),
  weight DECIMAL,
  repetitions INT
);

CREATE TABLE Exercice (
  exercice_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
CREATE TABLE Training (
  training_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE,
  user_id INT REFERENCES FITNESS_USER(id) 
);

CREATE TABLE ExerciceSeries (
  exercice_id INT REFERENCES Exercice(exercice_id),
  series_id INT REFERENCES Series(series_id),
  PRIMARY KEY (exercice_id, series_id)
);

CREATE TABLE TrainingExercice (
  training_id INT REFERENCES Training(training_id),
  exercice_id INT REFERENCES Exercice(exercice_id),
  PRIMARY KEY (training_id, exercice_id)
);
