CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(100),
    publish_date DATE,
);

INSERT INTO research_papers (paper_title, conference, publish_date, author_id) VALUES
('Paper 1', 'Conference X', '2021-01-01', 1),
('Paper 2', 'Conference Y', '2022-02-15', 2);
