DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE tasks (
  id serial PRIMARY KEY,
  title text NOT NULL,
  done boolean DEFAULT false NOT NULL,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
