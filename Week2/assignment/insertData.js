const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb'
});

// Insert authors
const insertAuthors = `
INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
('Alice Smith', 'University A', '1980-05-14', 10, 'Female', NULL),
('Bob Johnson', 'University B', '1975-08-24', 15, 'Male', 1),
('Charlie Brown', 'University A', '1990-12-01', 5, 'Male', 1),
('Diana Prince', 'University C', '1985-01-30', 20, 'Female', NULL),
('Edward Elric', 'University A', '1982-07-21', 12, 'Male', 4),
('Fiona Glenanne', 'University B', '1983-03-12', 7, 'Female', 1),
('George Martin', 'University C', '1995-11-15', 3, 'Male', 4),
('Hannah Arendt', 'University A', '1981-09-19', 22, 'Female', 2),
('Isaac Newton', 'University B', '1988-04-09', 25, 'Male', 4),
('Julia Child', 'University C', '1972-06-16', 18, 'Female', NULL),
('Karl Marx', 'University A', '1984-10-22', 9, 'Male', 6),
('Linda Hamilton', 'University B', '1992-02-01', 14, 'Female', 1),
('Mike Wazowski', 'University C', '1986-05-19', 6, 'Male', 7),
('Nina Simone', 'University A', '1990-12-04', 11, 'Female', 3),
('Oliver Twist', 'University B', '1978-07-25', 13, 'Male', 5),
('Peter Parker', 'University C', '1985-08-15', 17, 'Male', NULL);
`;

// Insert research papers
const insertResearchPapers = `
INSERT INTO research_papers (paper_title, conference, publish_date, author_id) VALUES
('Research on AI', 'AI Conference 2023', '2023-06-10', 1),
('Blockchain Technology', 'Tech Conference 2022', '2022-07-15', 2),
('Advancements in Machine Learning', 'ML Conference 2021', '2021-05-20', 3),
('Climate Change Effects', 'Environment Conference 2023', '2023-03-01', 4),
('Renewable Energy Sources', 'Energy Conference 2022', '2022-02-18', 5),
('Quantum Computing', 'Future Tech Conference 2021', '2021-11-11', 6),
('Social Media Impact', 'Social Science Conference 2023', '2023-01-05', 7),
('Data Privacy', 'Privacy Conference 2022', '2022-09-29', 8),
('Health Tech Innovations', 'Health Conference 2021', '2021-08-14', 9),
('Machine Ethics', 'Ethics in AI Conference 2023', '2023-12-25', 10),
('Economic Theories', 'Economics Conference 2022', '2022-03-13', 11),
('Cognitive Science', 'Science Conference 2021', '2021-04-08', 12),
('Cybersecurity Advances', 'Cyber Conference 2023', '2023-05-05', 13),
('Robotics in Industry', 'Industry Conference 2022', '2022-01-30', 14),
('Women in Science', 'Women Conference 2023', '2023-02-14', 15),
('Artificial Intelligence in Healthcare', 'Health AI Conference 2023', '2023-09-20', 1),
('Big Data and Analytics', 'Data Science Conference 2022', '2022-08-22', 2),
('The Future of Work', 'Work Conference 2021', '2021-10-17', 3),
('Smart Cities', 'Urban Development Conference 2023', '2023-04-04', 4),
('AI and Ethics', 'Ethics Conference 2022', '2022-06-30', 5),
('Social Robots', 'Robotics Conference 2021', '2021-07-29', 6),
('Financial Technology Innovations', 'Finance Conference 2023', '2023-11-11', 7),
('Sustainable Development', 'Sustainability Conference 2022', '2022-12-05', 8),
('Genomics and Biotechnology', 'Biotech Conference 2021', '2021-09-15', 9),
('Smart Grid Technology', 'Energy Conference 2023', '2023-08-01', 10),
('Education and Technology', 'EdTech Conference 2022', '2022-03-25', 11),
('Global Health Challenges', 'Global Health Conference 2021', '2021-05-30', 12),
('Digital Transformation', 'Tech Innovations Conference 2023', '2023-02-20', 13),
('AI in Marketing', 'Marketing Conference 2022', '2022-04-04', 14),
('Sports Analytics', 'Sports Science Conference 2021', '2021-06-06', 15);
`;

// Execute the SQL commands
connection.query(insertAuthors, (error, results) => {
    if (error) throw error;
    console.log('Authors inserted successfully.');
});

connection.query(insertResearchPapers, (error, results) => {
    if (error) throw error;
    console.log('Research papers inserted successfully.');
});

// Close the connection
connection.end();
