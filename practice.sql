 CREATE TABLE Users (
  UserID serial PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  Email varchar(50) NOT NULL,
  Birth_date date
);

CREATE TABLE User_Movies (
  UserMovieID serial PRIMARY KEY,
  UserID integer,
  MovieID integer,
  CONSTRAINT UserKey FOREIGN KEY (UserID)
    REFERENCES Users(UserID),
  CONSTRAINT MovieKey FOREIGN KEY (MovieID)
    REFERENCES Movies(MovieID)
);

INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('Silence of the Lambs','A young FBI cadet must receive the help of an 
incarcerated and manipulative cannibal killer to help catch another 
serial killer.',1,1,'silenceofthelambs.png',True);