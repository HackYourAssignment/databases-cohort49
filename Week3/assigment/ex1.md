# SQL Normalization Exercise

## 1. Violations of 1NF

- **Non-atomic values**:
  - `food_code` and `food_description` contain multiple values (e.g., `C1, C2`).

## 2. Recognizable Entities

1. **Member**
2. **Dinner**
3. **Venue**
4. **Food**

## 3. 3NF Tables and Columns

### Members Table

| Column          | Description                          |
|-----------------|--------------------------------------|
| member_id       | Unique identifier for each member    |
| member_name     | Name of the member                   |
| member_address  | Address of the member                |

### Dinners Table

| Column         | Description                              |
|----------------|------------------------------------------|
| dinner_id      | Unique identifier for each dinner        |
| dinner_date    | Date of the dinner                        |
| venue_code     | Foreign key referencing Venues table     |

### Venues Table

| Column              | Description                          |
|---------------------|--------------------------------------|
| venue_code          | Unique identifier for each venue     |
| venue_description   | Description of the venue             |

### Food Items Table

| Column         | Description                          |
|----------------|--------------------------------------|
| food_code      | Unique identifier for each food item |
| food_description | Description of the food item        |

### Dinner_Food Table (Join Table)

| Column         | Description                                |
|----------------|--------------------------------------------|
| dinner_id      | Foreign key referencing Dinners table      |
| food_code      | Foreign key referencing Food Items table   |

### Dinner_Attendance Table (Join Table)

| Column         | Description                                |
|----------------|--------------------------------------------|
| dinner_id      | Foreign key referencing Dinners table      |
| member_id      | Foreign key referencing Members table       |

## Conclusion

This design achieves 3NF by ensuring atomic attributes and eliminating transitive dependencies, leading to a more efficient database for tracking member dinners.
