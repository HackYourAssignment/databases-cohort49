1.What columns violate 1NF?

- food_code and food_description column. Because they both contain multiple values.

  2.What entities do you recognize that could be extracted?

- members, dinners, venues, food

  3.Name all the tables and columns that would make a 3NF compliant solution.

- Members => member_id, member_name, member_address
- Dinners => dinner_id, dinner_date
- Venues => venue_code, venue_description
- Foods => food_code, food_description
- Dinner_Venue => dinner_id, venue_code
- Dinner_Food => dinner_id, food_code
- Member_Dinner => member_id, dinner_id
