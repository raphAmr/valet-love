DROP TABLE IF EXISTS Bar_Drink;
DROP TABLE IF EXISTS Bar_Game;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Drink;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Bar;

CREATE TABLE Bar (
  id_bar INT,
  name_bar VARCHAR(30),
  address_bar VARCHAR(255),
  hours_bar TIME,
  size_bar INT
);

CREATE TABLE Drink (
  id_drink INT,
  name_drink VARCHAR(30),
  price_production_drink INT,
  price_selling_drink INT,
  ingredient_drink VARCHAR(255),
  quantity_drink INT
);

CREATE TABLE Bar_Drink (
  id_bar INT,
  id_drink INT,
  PRIMARY KEY (id_bar, id_drink),
  FOREIGN KEY (id_bar) REFERENCES Bar(id_bar),
  FOREIGN KEY (id_drink) REFERENCES Drink(id_drink)
);

CREATE TABLE Game (
  id_game INT,
  name_game VARCHAR(30),
  price_game INT,
  time_game TIME,
  nb_people_min_game INT,
  nb_peaple_max_game INT,
  state_game VARCHAR(30)
);

CREATE TABLE Bar_Game (
  id_bar INT,
  id_game INT,
  PRIMARY KEY (id_bar, id_game),
  FOREIGN KEY (id_bar) REFERENCES Bar(id_bar),
  FOREIGN KEY (id_game) REFERENCES Game(id_game)
);

CREATE TABLE Employee (
  id_employee INT,
  name_employee VARCHAR(30),
  age_employee INT,
  gender_employee VARCHAR(6),
  post_employee VARCHAR(30),
  salary_employee INT,
  FOREIGN KEY (id_employee) REFERENCES Bar(id_bar)
);


INSERT INTO Bar (id_bar, name_bar, address_bar, hours_bar, size_bar) VALUES
(1, 'The Cozy Pub', '123 Main St', '12:00:00', 100),
(2, 'The Night Owl', '456 Elm St', '18:00:00', 150),
(3, 'Sunny’s Tavern', '789 Oak St', '15:00:00', 120);


INSERT INTO Drink (id_drink, name_drink, price_production_drink, price_selling_drink, ingredient_drink, quantity_drink) VALUES
(1, 'Beer', 50, 100, 'Hops, Water, Yeast', 200),
(2, 'Wine', 100, 200, 'Grapes, Yeast', 150),
(3, 'Whiskey', 150, 300, 'Grain, Water', 100),
(4, 'Soda', 20, 50, 'Carbonated Water, Sugar', 300);


INSERT INTO Game (id_game, name_game, price_game, time_game, nb_people_min_game, nb_peaple_max_game, state_game) VALUES
(1, 'Pool', 500, '00:30:00', 2, 4, 'Available'),
(2, 'Darts', 300, '00:15:00', 2, 8, 'Available'),
(3, 'Foosball', 400, '00:20:00', 2, 4, 'Available'),
(4, 'Poker', 600, '01:00:00', 4, 10, 'Available'),
(5, 'Chess', 100, '01:00:00', 2, 2, 'Available');


INSERT INTO Employee (id_employee, name_employee, age_employee, gender_employee, post_employee, salary_employee, id_bar) VALUES
(1, 'John Doe', 30, 'Male', 'Bartender', 2500, 1),
(2, 'Jane Smith', 28, 'Female', 'Waitress', 2200, 1),
(3, 'Bob Johnson', 35, 'Male', 'Manager', 3000, 1),
(4, 'Alice Brown', 25, 'Female', 'Bartender', 2400, 2),
(5, 'Charlie Davis', 40, 'Male', 'Security', 2800, 2),
(6, 'Eve Martinez', 32, 'Female', 'Waitress', 2100, 2),
(7, 'George Wilson', 38, 'Male', 'Manager', 3200, 3),
(8, 'Helen Clark', 27, 'Female', 'Waitress', 2200, 3),
(9, 'Tom White', 45, 'Male', 'Security', 2700, 3),
(10, 'Anna Black', 31, 'Female', 'Bartender', 2500, 3);


INSERT INTO Bar_Drink (id_bar, id_drink) VALUES
(1, 1), 
(1, 2), 
(2, 3),
(2, 4),
(3, 1), 
(3, 4); 

INSERT INTO Bar_Game (id_bar, id_game) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 3), 
(2, 4),
(3, 1), 
(3, 2),
(3, 5); 