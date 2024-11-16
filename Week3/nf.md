1.Columns Violating 1NF
The food_code and food_description columns contain multiple values in a single row (e.g., C1, C2 for food_code and Curry, Cake for food_description), violating 1NF by not having atomic values.
2. Recognized Entities
Member: Represents club members.
Dinner: Represents dinners attended by members.
Venue: Represents venues for dinners.
Food Item: Represents food items served at dinners.
3. 3NF-Compliant Tables
1. Members Table
members
member_id (PK)
member_name
member_address
2. Dinners Table
dinners
dinner_id (PK)
dinner_date
venue_code (FK)
3. Venues Table
venues
venue_code (PK)
venue_description
4. Food Items Table
food_items
food_code (PK)
food_description
5. Dinner Attendance Table
dinner_attendance
attendance_id (PK)
dinner_id (FK)
member_id (FK)
6. Dinner Food Table
dinner_food
dinner_id (FK)
food_code (FK)