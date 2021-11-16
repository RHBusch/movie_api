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

//Routing requests via /movies to the top movies json. 
app.get('/movies',(req,res)=>{
res.json(topMovies)
});

app.get('/',(req,res)=>{
    res.send('What would Ted Lasso do?')
    }); // Creating endpoint / with textual response. 

app.use (morgan('common')); //Using morgan middleware to log requests. 
app.use (express.static('public')); // Routing static file requests to the public folder. 

//Creating an error doce if a response fails. 
app.use ((err,req,res,next) => {
    console.error (err.stack);
    res.status (500).send('Something is wrong here :(');
});

//Logging a message to the console when port 8080 is accessed. 
app.listen(8080, () =>{
    console.log('Hey! FYI... This app is listening on port 8080...');
  });