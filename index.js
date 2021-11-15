const express = require('express'),
    morgan = require('morgan');


const app = express ();

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

app.get('/movies',(req,res)=>{
res.json(topMovies)
});

app.get('/',(req,res)=>{
    res.send('What would Ted Lasso do?')
    });

app.use (morgan('common'));
app.use (express.static('public'));

app.use ((err,req,res,next) => {
    console.error (err.stack);
    res.status (500).send('Something is wrong here :(');
});

app.listen(8080, () =>{
    console.log('This app is listening on port 8080.');
  });