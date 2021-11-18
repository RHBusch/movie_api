const express = require('express'), // Importing express into package. 
    morgan = require('morgan'); // Importing morgan into package. 


const app = express (); 

//Creating an array of top movies. 
let topMovies = [
    {
      title: 'The Big Sick'
    },

    {
        title: 'Forrest Gump'  
    },

    {
        title: 'Lord of the Rings'  
    },

    {
        title: 'Slumdog Millionaire'  
    },

    {
        title: 'Inside Out'  
    },

    {
        title: 'Despicable Me'  
    },

    {
        title: 'War Horse'  
    },

    {
        title: 'Interstellar'  
    },

    {
        title: 'Les Miserables'  
    },

    {
        title: 'Step Brothers'  
    },
]

app.use (morgan('common')); //Using morgan middleware to log requests. 
app.use (express.static('public')); // Routing static file requests to the public folder. 

//Routing requests via /movies to the top movies json. 
app.get('/movies',(req,res)=>{
   res.json(topMovies)
});
   
//Routing requests for a single movie. 

  app.get('/movies/:title',(req,res) =>{
      res.send('Successful GET request returning data on the requested movie title.')
  });

//Routing requests for movies of a specific genre.

  app.get('/movies/:genre',(req,res) =>{
      res.send('Successful GET request returning data included in the requested movie genre.')
  });

//Routing reqeusts for movie data based on a single director. 

  app.get('/movies/:director',(req,res) => {
      res.send('Successful GET request returning data based on the requested director.')
  });

  //Routing the new user registration request 

  app.post('/users',(req,res) => {
      res.send('Successful POST request creating a new user and adding their data.')
  });

  //Routing the update username request

  app.put('/users/:username',(req,res) => {
      res.send ('Successful PUT request updating a user ID.')
  });

  //Routing request to add a movie to a user's list of favorites.

  app.post('/users/add/:movieTitle', (req,res) =>{
      res.send('Successful POST request adding a movie to user\'s list of favorites.')
  });

  //Routing request to delete a movie from a user's list of favorites. 

  app.delete('/users/remove/:movieTitle', (req,res)=>{
      res.send('Successful DELETE request removing a movie from a user\'s list of favorites')
  });

  //Routing a request to delete a user from the database. 

  app.delete('/users/remv/:username',(req,res) =>{
      res.send ('Successful DELETE request removing a user from the database.')
  });


 //Potentially irrelevant code below? 

//Creating an error doce if a response fails. 
app.use ((err,req,res,next) => {
    console.error (err.stack);
    res.status (500).send('Something is wrong here :(');
});

//Logging a message to the console when port 8080 is accessed. 
app.listen(8080, () =>{
    console.log('Hey! FYI... This app is listening on port 8080...');
  });

    app.get('/',(req,res)=>{
        res.send('What would Ted Lasso do?')
        }); // Creating endpoint / with textual response. 