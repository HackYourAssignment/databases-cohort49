## what columns violate 1NF?

Each columns should contain one single value, with no repeating groups.

food_code column contains multiple values (c1,c2...).
food_description column also contains multiple values (Curry, Cake,...)

## what entities do you recognize that could be extracted? And name all the tables and columns that would make a 3NF compliant solution

1) Member (member_id PRIMARY KEY, member_name, member_address)

2) Dinner(dinner_id PRIMARY KEY, dinner_date DATE, venue_code FOREIGN KEY REFERENCES Venue.venue_code, venue_description FOREIGN KEY REFERENCE Venue.venue_description )
3) Venues (venue_code, venue_description)
4) Food (food_code, food_description)
5) Dinner_Attendance (attendance_id PRIMARY KEY, member_id FOREIGN KEY REFERENCES  Member.member_id, dinner_id FOREIGN KEY REFERENCES Dinner.dinner_id, food_code FOREIGN KEY REFERENCES Food.food_code)
6) Dinner_Food (dinner_id FOREIGN KEY REFERENCING Dinner.dinner_id, food_code FOREIGN KEY REFERENCING Food.food_code)
7) Dinner_Member (dinner_id FOREIGN KEY REFERENCING Dinner.dinner_id, member_id FOREIGN KEY REFERENCING Member.member_id)
