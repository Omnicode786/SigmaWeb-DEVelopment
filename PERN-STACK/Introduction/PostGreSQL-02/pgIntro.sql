

-- -- there are multiple databases
-- -- inside a database there are schemas
-- -- by default everything lives under the public schemas 


-- -- most canjust use this

-- -- inside the schemas there are tables

-- -- common d types

-- -- integer and big int for whole numbers 

-- -- numeric or decimal for money and exact deximals

-- -- real and double precisionfor scientific floats

-- varchar or text fors trings

-- boolean tru false
-- data and time stamp
-- -- json b for structured json storage


-- tables can also have contraints

-- primary key uniquely identifies each rows

-- foreign key links
-- rows between tables
-- check validates some custom rules 



-- deploying it can be done using AWS is industry standard

-- we can also use doker toinstall sql

-- go to docker hub for the pg image but we wil need a real cloud thing for real time 

-- server less postgres like neon sepa base vercel xata or planet scale 

-- auto scaling backups connection pooling 





CREATE TABLE cars 
(
-- here we can add keys and columns
id SERIAL PRIMARY KEY,
-- SERIAL IS A POSTGRES SHORTCUT FOR AUTO INCREMENT
make VARCHAR(100) NOT NULL
MODEL VARCHAR(100) NOT NULL
YEAR INTEGER NOT NULL
price NUMERIC(10, 2) NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- '
INSERT INTO cars(make, model, year, price)
VALUES
('BMW', '4 series', 2022, 28000),
('Lamborghini', '7 series', 2025, 24000),
('Bughati', 'chiron', 2025, 200000),
('Tesla', 'model s', 2025, 5500),
('suzuki', 'maruti', 2005, 234000);
-- remember that these texts can only be in signle quatation beasy


select * from cars where year = 2021 and price < 50000
order by price desc;


select * from cars order by price asc limit 3


update cars set price = 24400 where id - 2;

delete from cars where id = 3;

-- if we forger the where clause then that would delete all database table
