import connection from './dbconnection';
import mysql from 'mysql';

CREATE TABLE authors ( authors_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(100) NOT NULL, university TEXT NOT NULL, date_of_birth DATE NOT NULL, h_index INT NOT NULL, gender ENUM('m','f'));

