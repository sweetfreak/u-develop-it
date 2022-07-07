-- THIS ORDER IS IMPORTANT BECAUSE OF HOW WE MAY 
-- ARRANGE OR USE THE DATA
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;

CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
   party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

CREATE TABLE voters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  voter_id INTEGER NOT NULL,
  candidate_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

-- the following could be done in javascript, but
-- it's best practice to do this here instead

  CONSTRAINT uc_voter UNIQUE (voter_id),
-- The ABOVE signifies the values inserted into voter_id field must be unique
-- The BELOW are foreign key constraints - on delete, the entire row will be deleted
  CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);
--   this combines the candidates table with the parties table
--   wherever
-- SELECT * FROM candidates
-- LEFT JOIN parties ON candidates.party_id = parties.id;

--    the AS keyword lets you rename a column (defines an alias for your data)
-- SELECT candidates.*, parties.name AS party_name
-- FROM candidates
-- LEFT JOIN parties ON candidates.party_id = parties.id;