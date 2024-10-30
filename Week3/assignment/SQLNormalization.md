# Exercise 1: SQL Normalization

## 1. What columns violate 1NF?

The following columns break 1NF rules because they contain multiple values in one cell:

    **food_code** – has entries like C1, C2, which list multiple codes.
    food_description – has entries like Curry, Cake, which list multiple food items.

## 2. What entities do you recognize that could be extracted?

  **Members:** This table would store information about each member who attends dinners, such as their ID, name, and address.
  **Dinners**: This table would include details about each dinner event, like the dinner’s unique ID and date.
  **Venues**: This table would list information about each venue where a dinner is held, with a code and a description of the venue.
  **Foods**: This table would store details about each type of food served, including a code and a description for each item.  **Dinner_Food:** Since each dinner can have multiple foods, this table connects dinners to the foods served at each.
  **Dinner_Attendance**: Because each dinner can have multiple members attending, this table links members to the dinners they attended.

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
venue_code           |     Code for the venue
