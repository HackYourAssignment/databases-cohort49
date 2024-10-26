import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "assignment",
});

const main = async () => {
  try {
    console.log("Connected as id " + connection.threadId);

    await connection.query("use assignment");

    const dropTable = "DROP TABLE IF EXISTS research_paper";
    const dropTable2 = "DROP TABLE IF EXISTS research_paper_author";
    const dropTable3 = "DROP TABLE IF EXISTS mentors";
    const dropTable4 = "DROP TABLE IF EXISTS author_mentor";
    await connection.query(dropTable2);
    await connection.query(dropTable);
    await connection.query(dropTable4);
    await connection.query(dropTable3);

    const CreateTableResearchPaper = `
    CREATE TABLE IF NOT EXISTS research_paper (
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_name VARCHAR(200) NOT NULL,
  conference_name VARCHAR(50) NOT NULL,
  publication_date DATE NOT NULL
 )`;

    const CreateTableResearchPaperAuthor = `
    CREATE TABLE IF NOT EXISTS research_paper_author (
  paper_id INT,
  author_id INT,
  FOREIGN KEY (paper_id) REFERENCES research_paper(paper_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (author_id) REFERENCES author(author_id) ON DELETE CASCADE ON UPDATE CASCADE,
  primary key (paper_id, author_id));
  `;

    await connection.query(CreateTableResearchPaper);
    await connection.query(CreateTableResearchPaperAuthor);
    console.log("Tables created");

    const insertDataToResearchPaper = `
 INSERT INTO research_paper (paper_name, conference_name, publication_date) VALUES 
 ('Are athletes good role models?', 'Sports',  '2021-01-01'),
 ('Do we need shorter working weeks?', 'Health',  '2019-11-04'),
 ('Are universities becoming business-driven?', 'Socio-economic',  '2020-01-15'),
 ('How does the government assess the health care needs of communities?', 'Health',  '2020-02-02'),
 ('Cybersecurity: Can we really be safe?', 'Technology',  '2020-03-10'),
 ('The impact of climate change on agriculture', 'Environment',  '2020-04-21'),
 ('Artificial Intelligence: Opportunities and Threats', 'Technology',  '2021-05-05'),
 ('The role of social media in modern communication', 'Communication',  '2021-06-18'),
 ('Mental health awareness in schools', 'Health', '2021-07-30'),
 ('Urbanization and its effects on wildlife', 'Environmental Science', '2021-08-25'),
 ('Renewable energy: A sustainable future?', 'Energy', '2021-09-10'),
 ('Gender equality in the workplace', 'Sociology', '2021-10-12'),
 ('The rise of telemedicine', 'Health', '2021-11-14'),
 ('Blockchain technology and its implications', 'Technology', '2021-12-05'),
 ('Cyberbullying: A growing concern', 'Education', '2022-01-20'),
 ('The importance of biodiversity', 'Environmental Science', '2022-02-15'),
 ('Exploring the human genome', 'Genetics', '2022-03-30'),
 ('The effects of social isolation on mental health', 'Health', '2022-04-10'),
 ('Artificial intelligence in healthcare', 'Health', '2022-05-01'),
 ('The future of work: Remote vs. in-office', 'Business', '2022-06-20'),
 ('Understanding climate policy', 'Environmental Science', '2022-07-15'),
 ('Education in the digital age', 'Education', '2022-08-12'),
 ('Economic impact of the COVID-19 pandemic', 'Economics', '2022-09-05'),
 ('The psychology of addiction', 'Psychology', '2022-10-30'),
 ('The role of technology in modern education', 'Education', '2022-11-18'),
 ('Cultural impacts of globalization', 'Sociology', '2022-12-01'),
 ('Mental health and the workplace', 'Health', '2023-01-15'),
 ('Sustainable urban development', 'Architecture', '2023-02-20'),
 ('The influence of advertising on consumer behavior', 'Marketing', '2023-03-18'),
 ('Exploring renewable energy solutions', 'Energy', '2023-04-10'),
 ('The effects of screen time on children', 'Health', '2023-05-25'),
 ('Emerging trends in cybersecurity', 'Technology', '2023-06-30')
`;

    const insertDataToResearchPaperAuthor = `
    INSERT INTO research_paper_author (paper_id, author_id) VALUES
    (1, 1),
    (2, 5),
    (3, 8),
    (4, 2),
    (5, 7),
    (6, 3),
    (7, 9),
    (8, 4),
    (9, 10),
    (10, 6),
    (11, 11),
    (12, 5),
    (13, 1),
    (14, 2),
    (15, 12),
    (16, 3),
    (17, 9),
    (18, 4),
    (19, 8),
    (20, 13),
    (21, 6),
    (22, 14),
    (23, 5),
    (24, 11),
    (25, 10),
    (26, 15),
    (27, 7),
    (28, 2),
    (29, 9),
    (30, 12),
    (31, 3),
    (32, 8)
`;

    await connection.query(insertDataToResearchPaper);
    await connection.query(insertDataToResearchPaperAuthor);

    console.log("Data inserted");
  } catch (error) {
    console.log("error:", error.message);
    console.log("error:", error.stack);
  } finally {
    await connection.end();
  }
};
main();
