CREATE TABLE authors (
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(100),
  university VARCHAR(100),
  date_of_birth DATE,
  h_index INT,
  gender ENUM('male', 'female', 'other')
);

ALTER TABLE authors ADD COLUMN mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);

CREATE TABLE research_papers (
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(100),
  publish_date DATE,
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES
('Author 1', 'University A', '1990-01-01', 10, 'male'),
('Author 2', 'University B', '1975-02-12', 20, 'female');

INSERT INTO research_papers (paper_title, conference, publish_date, author_id) VALUES
('Paper 1', 'Conference X', '2021-01-01', 1),
('Paper 2', 'Conference Y', '2022-02-15', 2);
