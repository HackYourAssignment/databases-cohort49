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

  // 1. Insert 15 Turkish mining experts into the authors table
  const insertAuthors = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES 
      ('Ahmet Yılmaz', 'İstanbul Teknik Üniversitesi', '1960-04-15', 35, 'male', NULL),
      ('Elif Demir', 'Karadeniz Teknik Üniversitesi', '1972-09-08', 28, 'female', NULL),
      ('Mehmet Kaya', 'Zonguldak Bülent Ecevit Üniversitesi', '1980-03-22', 25, 'male', 1),
      ('Zeynep Çelik', 'ODTÜ', '1985-11-12', 22, 'female', 2),
      ('Murat Yıldız', 'Hacettepe Üniversitesi', '1975-06-27', 30, 'male', 1),
      ('Ayşe Karaca', 'İstanbul Üniversitesi', '1990-07-09', 20, 'female', 3),
      ('Ali Şahin', 'Dokuz Eylül Üniversitesi', '1978-05-14', 32, 'male', 4),
      ('Fatma Acar', 'Akdeniz Üniversitesi', '1982-12-19', 18, 'female', 5),
      ('Emre Arslan', 'Cumhuriyet Üniversitesi', '1991-03-05', 17, 'male', 6),
      ('Selin Ersoy', 'Atatürk Üniversitesi', '1983-08-10', 21, 'female', 7),
      ('Can Korkmaz', 'Ankara Üniversitesi', '1988-11-23', 27, 'male', 8),
      ('Hülya Güneş', 'Çukurova Üniversitesi', '1977-02-15', 24, 'female', 9),
      ('Burak Aydın', 'Pamukkale Üniversitesi', '1985-04-17', 29, 'male', 10),
      ('Derya Polat', 'Fırat Üniversitesi', '1993-09-04', 16, 'female', 11),
      ('Tolga Yılmaz', 'Ege Üniversitesi', '1979-12-21', 31, 'male', 12);
  `;

  // 2. Insert 30 mining-related research papers into the research_Papers table
  const insertPapers = `
    INSERT INTO research_Papers (paper_title, conference, publish_date, author_id)
    VALUES 
      ('Cevher Zenginleştirme Yöntemleri', 'Madencilik Konferansı 2020', '2020-10-10', 1),
      ('Yeraltı Maden İşletmeleri ve Güvenlik', 'Maden Güvenliği Zirvesi 2021', '2021-02-15', 2),
      ('Açık Ocak Madenciliğinde Verimlilik', 'Teknoloji Zirvesi 2019', '2019-06-05', 3),
      ('Kömür Madenciliğinde İşçi Sağlığı', 'Madencilik Sağlık Konferansı 2022', '2022-03-23', 4),
      ('Cevher Zenginleştirmede Yeni Teknolojiler', 'Madencilik İnovasyon Zirvesi 2021', '2021-08-12', 5),
      ('Yeraltı Madenlerinde Otomasyon', 'Otomasyon ve Madencilik 2020', '2020-09-18', 6),
      ('Maden Havalandırma Sistemleri', 'Havalandırma Teknolojileri 2021', '2021-07-05', 7),
      ('Açık Ocak Madenciliğinde Patlatma Teknolojileri', 'Patlatma Teknolojileri 2022', '2022-04-19', 8),
      ('Metal Madenciliğinde Yenilikler', 'Metal Madencilik 2021', '2021-01-25', 9),
      ('Kömür Madenciliğinde Çevre Etkileri', 'Çevre Zirvesi 2020', '2020-11-20', 10),
      ('Jeotermal Madenciliğin Geleceği', 'Jeotermal Enerji Konferansı 2020', '2020-03-15', 11),
      ('Madencilikte Yapay Zeka Uygulamaları', 'AI Madencilik 2021', '2021-09-09', 12),
      ('Madencilikte Veri Analitiği', 'Veri Bilimi 2019', '2019-10-02', 13),
      ('Maden Arama ve IoT Teknolojileri', 'IoT Zirvesi 2020', '2020-06-21', 14),
      ('İklim Değişikliği ve Madencilik', 'İklim Zirvesi 2021', '2021-12-05', 15),
      ('Madenlerde Çevresel Sürdürülebilirlik', 'Çevre ve Madencilik 2020', '2020-07-11', 1),
      ('Maden Kazalarında İş Güvenliği', 'İş Güvenliği Zirvesi 2021', '2021-10-03', 2),
      ('Kömür Madenciliğinde Risk Yönetimi', 'Risk Yönetimi 2019', '2019-05-30', 3),
      ('Yeraltı Madenlerinde Maliyet Azaltma', 'Madencilik Ekonomisi 2022', '2022-07-22', 4),
      ('Maden Yataklarının Modellemesi', 'Jeoloji ve Madencilik 2020', '2020-02-27', 5),
      ('Açık Ocaklarda Çevresel Yönetim', 'Çevre Zirvesi 2021', '2021-04-14', 6),
      ('Madencilikte Patlayıcı Madde Yönetimi', 'Patlayıcı Teknolojiler 2020', '2020-08-17', 7),
      ('Madenlerde Sıvıların Kullanımı', 'Sıvı Teknolojileri 2021', '2021-05-19', 8),
      ('Açık Ocaklarda Optimizasyon Yöntemleri', 'Optimizasyon Zirvesi 2022', '2022-09-12', 9),
      ('Maden Ocaklarında Yangın Riskleri', 'Yangın Güvenliği Zirvesi 2021', '2021-11-11', 10),
      ('Madencilikte Yenilenebilir Enerji Kullanımı', 'Enerji Konferansı 2020', '2020-09-20', 11),
      ('Linyit Madenciliğinde Yeni Yaklaşımlar', 'Madencilik Gelişim Zirvesi 2021', '2021-06-30', 12),
      ('Madencilik Atık Yönetimi', 'Çevre ve Atık Yönetimi 2020', '2020-11-12', 13),
      ('Madencilikte İşçi Hakları ve Güvenlik', 'İşçi Hakları Zirvesi 2021', '2021-03-02', 14),
      ('Çok Disiplinli Madencilik Çözümleri', 'Madencilik Çözümleri 2022', '2022-08-15', 15);
  `;

  // Execute the insert queries
  connection.query(insertAuthors, (err, result) => {
    if (err) throw err;
    console.log('15 Turkish mining authors inserted into authors table.');

    connection.query(insertPapers, (err, result) => {
      if (err) throw err;
      console.log('30 mining-related research papers inserted into research_Papers table.');
      connection.end();
    });
  });
});
