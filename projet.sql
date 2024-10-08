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