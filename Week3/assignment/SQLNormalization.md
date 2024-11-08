# Exercise 1: SQL Normalization

## 1. What columns violate 1NF?

The following columns break 1NF rules because they contain multiple values in one cell:

    **food_code** – it has entries like "C1, C2" which list several food codes in one cell.
    **food_description** – it has entries like "Curry, Cake," listing multiple food items in one cell.

    Also, the dinner_date column has inconsistent date formats, like 2020-03-15, 2020/03/15, 20-03-2020, and Mar 25 '20. To meet 1NF, all dates should use a single, consistent format, such as YYYY-MM-DD.

## 2. What entities do you recognize that could be extracted?

  **Members:** A table with details about each member attending dinners, including member_id (ID number), member_name (name), and member_address (address).
  **Dinners**: A table that records each dinner event, with columns like dinner_id (ID number) and dinner_date (date of the dinner).
  **Venues**: A table for each venue where dinners are held, with venue_code (venue ID) and venue_description (venue name or description).
  **Foods**: A table listing each type of food served, with food_code (food ID) and food_description (description of the food). 
  **Dinner_Food:** A table connecting dinners with the foods served at them, since a dinner can have multiple foods.
  **Dinner_Attendance**: A table showing which members attended which dinners, since a dinner can have multiple members attending.

## Name all the tables and columns that would make a 3NF compliant solution

### Members Table

 Column        |    Description
member_id      |    Unique ID for each member
member_name    |    Name of the member
member_address |    Address of the member

### Dinners Table

Column          |    Description
dinner_id       |    Unique ID for each dinner
dinner_date     |    Date of the dinner event
venue_code      |    Code for the venue

### Venues Table

Column               |    Description
venue_code           |    Unique code for each venue
venue_description    |    Description of the venue

### Foods Table

Column               |    Description
food_code            |    Unique code for each food item
food_description     |     Description of the food item

### Dinner_Food Table

Column               |     Description
dinner_id            |     ID for the dinner
food_code            |     Code for the food item

### Dinner_Attendance Table

Column               |     Description
member_id            |     ID for the member
dinner_id            |     ID for the dinner

