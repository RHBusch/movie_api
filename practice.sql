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

SELECT column_1, column_2 … column_n
  FROM table_name
  WHERE conditions;

SELECT Title, Description, DirectorID
  FROM Movies
  WHERE GenreID = 1;

SELECT *
  FROM Movies
  WHERE Title = 'Silence of the Lambs';

SELECT Title, Description, DirectorID
  FROM Movies
  WHERE GenreID = 1 AND DirectorID = 1;




  var movie1 = {
Title: "Lord of the Rings and the Two Towers",
Description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
 Genre:{
  Name: "Fantasty",
  Description: "Fantasy film is a genre that incorporates imaginative and fantastic themes. These themes usually involve magic, supernatural events, or fantasy worlds."
  },
    Ratings: {
      IMDB: "8.7/10",
      Rotten Tomatoes: "95%"
       },
  Director:{
    Name: "Peter Jackson",
   Bio: "Peter Jackson is a New Zealand film director, screenwriter, and film producer.",
    Birth:"1961",
  Death: "N/A"
    },
 ImagePath:"twotowers.png",
   Featured: true}


   {
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Featured: true
}