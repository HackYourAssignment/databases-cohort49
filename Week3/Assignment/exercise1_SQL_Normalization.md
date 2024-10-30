
# SQL Normalization Solution

## 1. Columns that Violate 1NF
The columns `food_code` and `food_description` violate 1NF, as they contain multiple values separated by commas. To comply with 1NF, each cell must hold a single atomic value.

## 2. Recognizable Entities
From the table, the following entities can be identified:

1. **Members**: Contains member details (`member_id`, `member_name`, `member_address`).
2. **Dinners**: Stores details about each dinner event (`dinner_id`, `dinner_date`).
3. **Venues**: Represents venues where dinners are held (`venue_code`, `venue_description`).
4. **Foods**: Holds information about food items served (`food_code`, `food_description`).

## 3. Tables and Columns for a 3NF Compliant Solution
To normalize the table into 3NF, the data is split into separate tables, each representing one of the entities listed above. Below is the SQL structure for each table:

1. **Members Table**
   - Stores information about each member.
   ```sql
   CREATE TABLE Members (
       member_id INT PRIMARY KEY,
       member_name VARCHAR(50),
       member_address VARCHAR(100)
   );
   ```

2. **Venues Table**
   - Stores details about venues.
   ```sql
   CREATE TABLE Venues (
       venue_code VARCHAR(10) PRIMARY KEY,
       venue_description VARCHAR(50)
   );
   ```

3. **Foods Table**
   - Contains information about food items.
   ```sql
   CREATE TABLE Foods (
       food_code VARCHAR(10) PRIMARY KEY,
       food_description VARCHAR(50)
   );
   ```

4. **Dinners Table**
   - Holds information on dinner events, including the venue where each dinner is held.
   ```sql
   CREATE TABLE Dinners (
       dinner_id VARCHAR(10) PRIMARY KEY,
       dinner_date DATE,
       venue_code VARCHAR(10),
       FOREIGN KEY (venue_code) REFERENCES Venues(venue_code)
   );
   ```

5. **Members_Dinners Table**
   - Links members with the dinners they attended. This is a junction table representing a many-to-many relationship between `Members` and `Dinners`.
   ```sql
   CREATE TABLE Members_Dinners (
       member_id INT,
       dinner_id VARCHAR(10),
       PRIMARY KEY (member_id, dinner_id),
       FOREIGN KEY (member_id) REFERENCES Members(member_id),
       FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id)
   );
   ```

6. **Dinners_Foods Table**
   - Links dinners with the food items served at each event. This is a junction table for a many-to-many relationship between `Dinners` and `Foods`.
   ```sql
   CREATE TABLE Dinners_Foods (
       dinner_id VARCHAR(10),
       food_code VARCHAR(10),
       PRIMARY KEY (dinner_id, food_code),
       FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
       FOREIGN KEY (food_code) REFERENCES Foods(food_code)
   );
   ```

This normalized structure ensures that:
- Members and dinner events are linked through the `Members_Dinners` table, allowing each member to participate in multiple dinners.
- Dinners and foods are connected through the `Dinners_Foods` table, making it possible to serve multiple food items at each dinner.

With this structure, the data is now in 3NF, minimizing redundancy and ensuring data integrity.
