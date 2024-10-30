``` 


What columns violate 1NF?
    1 .  Dinner_date column the format on date is not consistent.
    2.  Food_code and food_description column's  has more than many data in a single  cell. 

What entities do you recognize that could be extracted?

    1.  Member
    2.  Dinner
    3.  Food
    4.  Venue
    5.  Member_dinner
    6.  Dinner_venue_food

Name all the tables and columns that would make a 3NF compliant solution ?

    1.  venue_code PK | venue_description  (Venue)
    2.  food_code  PK | food_description  (Food)
    3.  member_id  PK | member_name | member_address (Member)
    4.  dinner_id  PK | dinner_date (dinner)
    5.  (member_id,  dinner_id ) PK| member_id  FK| dinner_id FK  (member_dinner)
    6.  (dinner_id,venue_code, food_code) PK | dinner_id FK |venue_code FK |food_code FK| (dinner_venue_food)
    
```
