# SQL Normalization Solution

## 1. Columns Violating 1NF

- `food_code` and `food_description` contain multiple values separated by commas. This violates 1NF.

## 2. Recognizable Entities

1. **Member** (attributes: `member_id`, `member_name`, `member_address`)
2. **Dinner** (attributes: `dinner_id`, `dinner_date`, `venue_code`)
3. **Venue** (attributes: `venue_code`, `venue_description`)
4. **Food** (attributes: `food_code`, `food_description`)
5. **DinnerFood** (for many-to-many relationship between Dinner and Food)

## 3. 3NF-Compliant Tables

### Member Table

| Column         | Type    | Description           |
| -------------- | ------- | --------------------- |
| member_id      | INT     | Primary Key           |
| member_name    | VARCHAR | Name of the member    |
| member_address | VARCHAR | Address of the member |

### Dinner Table

| Column      | Type    | Description                 |
| ----------- | ------- | --------------------------- |
| dinner_id   | INT     | Primary Key                 |
| dinner_date | DATE    | Date of the dinner          |
| venue_code  | VARCHAR | Foreign Key, links to Venue |

### Venue Table

| Column            | Type    | Description              |
| ----------------- | ------- | ------------------------ |
| venue_code        | VARCHAR | Primary Key              |
| venue_description | VARCHAR | Description of the venue |

### Food Table

| Column           | Type    | Description             |
| ---------------- | ------- | ----------------------- |
| food_code        | VARCHAR | Primary Key             |
| food_description | VARCHAR | Description of the food |

### DinnerFood Table (Associative Table)

| Column    | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| dinner_id | INT     | Foreign Key, links to Dinner |
| food_code | VARCHAR | Foreign Key, links to Food   |
