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



----- Correct Code for inserting into Mongo DB ------ The terminal will not take two words separated RottenTomatoes. 
--- Update movie1 to have % for tomatoes 
--- Figure out image stuff + adjust naming conventions

  var movie1 = {
Title: "Lord of the Rings and the Two Towers",
Description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
 Genre:{
  Name: "Fantasty",
  Description: "Fantasy film is a genre that incorporates imaginative and fantastic themes. These themes usually involve magic, supernatural events, or fantasy worlds."
  },
  Ratings:{
      IMDB: "8.7/10",
      RottenTomatoes: "95/100", 
       },
  Director:{
    Name: "Peter Jackson",
   Bio: "Peter Jackson is a New Zealand film director, screenwriter, and film producer.",
    Birth:"1961",
  Death: "N/A"
    },
 ImagePath:"twotowers.png",
   Featured: true}
--------------------------------
var movie2 = {
Title: "The Hobbit",
Description: "A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.",
 Genre:{
  Name: "Fantasty",
  Description: "Fantasy film is a genre that incorporates imaginative and fantastic themes. These themes usually involve magic, supernatural events, or fantasy worlds."
  },
  Ratings:{
      IMDB: "7.8/10",
      RottenTomatoes: "64%", 
       },
  Director:{
    Name: "Peter Jackson",
   Bio: "Peter Jackson is a New Zealand film director, screenwriter, and film producer.",
    Birth:"1961",
  Death: "N/A"
    },
 ImagePath:"thehobbit.png",
   Featured: false}

   -----------------------------------------

   var movie3 = {
Title: "Harry Potter and the Prisoner of Azkaban",
Description: "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.",
 Genre:{
  Name: "Fantasty",
  Description: "Fantasy film is a genre that incorporates imaginative and fantastic themes. These themes usually involve magic, supernatural events, or fantasy worlds."
  },
  Ratings:{
      IMDB: "7.9/10",
      RottenTomatoes: "90%", 
       },
  Director:{
    Name: "Alfonso Cuaron",
   Bio: "Alfonso Cuaron is a Mexican film director, film producer, screenwriter, cinematographer and film editor.",
    Birth:"1961",
  Death: "N/A"
    },
 ImagePath:"PoAZ.png",
   Featured: true}

   ---------------------------------------

    var movie4 = {
Title: "Children of Men",
Description: "In 2027, in a chaotic world in which women have become somehow infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
 Genre:{
  Name: "Thriller",
  Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Ratings:{
      IMDB: "7.9/10",
      RottenTomatoes: "92%", 
       },
  Director:{
    Name: "Alfonso Cuaron",
   Bio: "Alfonso Cuaron is a Mexican film director, film producer, screenwriter, cinematographer and film editor.",
    Birth:"1961",
  Death: "N/A"
    },
 ImagePath:"childrenofmen.png",
   Featured: false}

   ---------------------------------------

  var movie5 = {
Title: "The King of Staten Island",
Description: "Scott has been a case of arrested development since his firefighter dad died. He spends his days smoking weed and dreaming of being a tattoo artist until events force him to grapple with his grief and take his first steps forward in life.",
 Genre:{
  Name: "Comedy",
  Description: "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement."
  },
  Ratings:{
      IMDB: "7.1/10",
      RottenTomatoes: "75%", 
       },
  Director:{
    Name: "Judd Apatow",
   Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
    Birth:"1967",
  Death: "N/A"
    },
 ImagePath:"kingofstatenisland.png",
   Featured: false}

   ----------------------------------------

   var movie6 = {
Title: "The 40 Year Old Virgin",
Description: "Goaded by his buddies, a nerdy guy who's never done the deed only finds the pressure mounting when he meets a single mother.",
 Genre:{
  Name: "Comedy",
  Description: "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement."
  },
  Ratings:{
      IMDB: "7.1/10",
      RottenTomatoes: "85%", 
       },
  Director:{
    Name: "Judd Apatow",
   Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
    Birth:"1967",
  Death: "N/A"
    },
 ImagePath:"the40yearoldvirgin.png",
   Featured: false}

--------------------------------------------

var movie7 = {
Title: "The Big Sick",
Description: "Pakistan-born comedian Kumail Nanjiani and grad student Emily Gardner fall in love but struggle as their cultures clash. When Emily contracts a mysterious illness, Kumail finds himself forced to face her feisty parents, his family's expectations, and his true feelings.",
 Genre:{
  Name: "Comedy",
  Description: "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement."
  },
  Ratings:{
      IMDB: "7.5/10",
      RottenTomatoes: "98%", 
       },
  Director:{
    Name: "Judd Apatow",
   Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
    Birth:"1967",
  Death: "N/A"
    },
 ImagePath:"thebigsick.png",
   Featured: true}

---------------------------------------

var movie8 = {
Title: "Superbad",
Description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
 Genre:{
  Name: "Comedy",
  Description: "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement."
  },
  Ratings:{
      IMDB: "7.6/10",
      RottenTomatoes: "88%", 
       },
  Director:{
    Name: "Judd Apatow",
   Bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
    Birth:"1967",
  Death: "N/A"
    },
 ImagePath:"superbad.png",
   Featured: false}

  -------------------------------

  var movie9 = {
Title: "Eternals",
Description: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
 Genre:{
  Name: "Thriller",
  Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Ratings:{
      IMDB: "6.8/10",
      RottenTomatoes: "48%", 
       },
  Director:{
    Name: "Chloe Zhao",
   Bio: "Chloe Zhao is a Chinese-born filmmaker, known primarily for her work on independent films.",
    Birth:"1982",
  Death: "N/A"
    },
 ImagePath:"eternals.png",
   Featured: false} 

  -------------------------------

  var movie10 = {
Title: "Avatar",
Description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
 Genre:{
  Name: "Fantasy",
  Description: "Fantasy film is a genre that incorporates imaginative and fantastic themes. These themes usually involve magic, supernatural events, or fantasy worlds."
  },
  Ratings:{
      IMDB: "7.8/10",
      RottenTomatoes: "81%", 
       },
  Director:{
    Name: "James Cameron",
   Bio: "James Francis Cameron CC is a Canadian filmmaker. Best known for making science fiction and epic films.",
    Birth:"1954",
  Death: "N/A"
    },
 ImagePath:"avatar.png",
   Featured: true}

   -------------------------------  



