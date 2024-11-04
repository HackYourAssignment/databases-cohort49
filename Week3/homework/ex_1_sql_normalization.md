# Exercise 1 : SQL Normalization

## 1. What columns violate 1NF?

The following columns violate 1NF:

- **food_code** – contains multiple values (e.g., `C1, C2`).
- **food_description** – also contains multiple values (e.g., `Curry, Cake`).
- **dinner_date** – inconsistent date formats (e.g., 2020-03-15, 2020/03/15, 20-03-2020, Mar 25 '20), which violates 1NF's requirement for atomic values.

## 2. What entities do you recognize that could be extracted?

- **Members**: Information about members who attend the dinners, with fields like `member_id`, `member_name`, and `member_address`.
- **Dinners**: Information about dinners, including `dinner_id` and `dinner_date`.
- **Venues**: Information about venues where dinners are held, including `venue_code` and `venue_description`.
- **Foods**: Information about food items, including `food_code` and `food_description`.
- **Dinner_Food**: A many-to-many relationship between dinners and foods, since a single dinner may involve multiple dishes.

## 3. Name all the tables and columns that would make a 3NF compliant solution.

### Table `Members`

| Column         | Description                      |
| -------------- | -------------------------------- |
| member_id      | Unique identifier for the member |
| member_name    | Name of the member               |
| member_address | Address of the member            |

### Table `Dinners`

| Column      | Description                      |
| ----------- | -------------------------------- |
| dinner_id   | Unique identifier for the dinner |
| dinner_date | Date of the dinner               |
| venue_code  | Code for the venue               |

### Table `Venues`

| Column            | Description               |
| ----------------- | ------------------------- |
| venue_code        | Unique code for the venue |
| venue_description | Description of the venue  |

### Table `Foods`

| Column           | Description                   |
| ---------------- | ----------------------------- |
| food_code        | Unique code for the food item |
| food_description | Description of the food item  |

### Table `Dinner_Food`

| Column    | Description               |
| --------- | ------------------------- |
| dinner_id | Identifier for the dinner |
| food_code | Code for the food item    |

### Table `Dinner_Attendance`

| Column    | Description               |
| --------- | ------------------------- |
| member_id | Identifier for the member |
| dinner_id | Identifier for the dinner |
