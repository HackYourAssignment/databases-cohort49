# normalize data base 

The database is both 2NF and 3NF.
recipe_Category and Recipe_Ingredient are junction tables, using composite primary key and ensuring that each column directly depends on both parts of the key.

and for 3NF requirement (all non-key attributes are directly related to the primary key)
for example, each recipe's name depends directly on the recipe_id and no attributes depend on non-key attributes in any of the tables.

### with the large volume of recipes, we can consider few things,

Performance Optimization: when querying it could minimize the performance. we can solve it by indexing frequently queried columns.
