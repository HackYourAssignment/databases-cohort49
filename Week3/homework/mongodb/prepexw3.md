# Are your tables in 2NF / 3NF?

The tables Recipe, Category, Ingredient, and Step satisfy 2NF and 3NF. In RecipeCategory, RecipeIngredient, and RecipeStep, non-key attributes depend only on primary keys.

# What normalization changes were made?

We created junction tables like RecipeCategory, RecipeIngredient, and RecipeStep and ensured atomicity in fields.


# How can I identify if a table is in Second Normal Form (2NF) or Third Normal Form (3NF)?   
To identify if a table is in 2NF or 3NF, ensure it is in 1NF, then check for full functional dependency on the primary key for 2NF, and ensure no transitive dependencies for 3NF.
