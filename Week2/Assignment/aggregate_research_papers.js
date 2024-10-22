const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password',
  database: 'research_db' // Connect to the new database
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');

  // 1. Query to get the number of authors for each research paper
  const queryPapersWithAuthorCount = `
    SELECT rp.paper_title, 
           COUNT(rp.author_id) AS AuthorCount
    FROM research_Papers rp
    LEFT JOIN authors a ON rp.author_id = a.author_id
    GROUP BY rp.paper_title;
  `;

  // 2. Query to get the total number of papers published by female authors
  const queryFemaleAuthorsPaperCount = `
    SELECT COUNT(rp.paper_id) AS FemaleAuthorPaperCount
    FROM research_Papers rp
    JOIN authors a ON rp.author_id = a.author_id
    WHERE a.gender = 'female';
  `;

  // 3. Query to get the average h-index of authors per university
  const queryAverageHIndexPerUniversity = `
    SELECT university, 
           AVG(h_index) AS AverageHIndex
    FROM authors
    GROUP BY university;
  `;

  // 4. Query to get the total number of papers by authors per university
  const queryPapersPerUniversity = `
    SELECT a.university, 
           COUNT(rp.paper_id) AS TotalPapers
    FROM authors a
    LEFT JOIN research_Papers rp ON a.author_id = rp.author_id
    GROUP BY a.university;
  `;

  // 5. Query to get the minimum and maximum h-index of authors per university
  const queryMinMaxHIndexPerUniversity = `
    SELECT university, 
           MIN(h_index) AS MinHIndex, 
           MAX(h_index) AS MaxHIndex
    FROM authors
    GROUP BY university;
  `;

  // Execute the queries in order
  connection.query(queryPapersWithAuthorCount, (err, results) => {
    if (err) throw err;
    console.log('Research papers and their author counts:');
    console.table(results);

    connection.query(queryFemaleAuthorsPaperCount, (err, results) => {
      if (err) throw err;
      console.log('Total papers by female authors:', results);

      connection.query(queryAverageHIndexPerUniversity, (err, results) => {
        if (err) throw err;
        console.log('Average H-index per university:');
        console.table(results);

        connection.query(queryPapersPerUniversity, (err, results) => {
          if (err) throw err;
          console.log('Total papers per university:');
          console.table(results);

          connection.query(queryMinMaxHIndexPerUniversity, (err, results) => {
            if (err) throw err;
            console.log('Min and Max H-index per university:');
            console.table(results);
            connection.end();
          });
        });
      });
    });
  });
});
