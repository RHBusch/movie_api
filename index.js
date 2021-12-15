// Log back into Heroku + Mongo Atlas. Start by trying to connect the mongo import code below in terminal. Verify proper syntax and shell usage. 

const express = require('express'), // Importing express
    morgan = require('morgan'), // Importing morgan 
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),//importing bodyParser 
    Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB',{useNewUrlParser: true,
useUnifiedTopology: true})



const app = express (); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {check, validationResult} = require ('express-validator');

const cors = require('cors');
app.use(cors()); // This makes the app available to all requests.


let auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');

app.use (morgan('common')); //Using morgan middleware to log requests. 
app.use (express.static('public')); // Routing static file requests to the public folder. 



//Routing requests for all movies. (WORKS CORRECTLY)
app.get('/movies', passport.authenticate('jwt',{session: false}),
(req,res)=>{
    Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: '+ err);
    });
});
   
//Routing requests for a single movie. (WORKS CORRECTLY) 

  app.get('/movies/:Title', passport.authenticate('jwt',{session: false}),
  (req,res) =>{
      Movies.findOne({Title: req.params.Title})
      .then((movie) =>{
          res.json(movie);
      })
      .catch((err) =>{
          console.error(err);
          res.status(500).send('Error: ' + err);
      });        
      });


//Routing requests for movies of a specific genre. (WORKS CORRECTLY)

  app.get('/movies/genre/:Name',passport.authenticate('jwt',{session: false}),
  (req,res) =>{
    Movies.find({'Genre.Name': req.params.Name})
    .then((genreType) =>{
        res.json(genreType);
    })
    .catch((err) =>{
        console.error(err);
        res.status(500).send('Error: ' + err);
    });  
  });

//Routing reqeusts for movie data based on a single director. (WORKS CORRECTLY)

  app.get('/movies/director/:Name',passport.authenticate('jwt',{session: false}),
  (req,res) =>{
    Movies.find({'Director.Name': req.params.Name})
    .then((directorName) =>{
        res.json(directorName);
    })
    .catch((err) =>{
        console.error(err);
        res.status(500).send('Error: ' + err);
    });  

});


  //Routing the new user registration request. (WORKS CORRECTLY) 

  app.post('/users',[
      check('Username','Username is required').isLength({min:5}),
      check('Username', 'Username cannot contain non alphanumeric characters.').isAlphanumeric(),
      check('Password','Password is required.').not().isEmpty(),
      check('Email','Email does not appear to be valid.').isEmail()

  ],

  (req,res) =>{
      let errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(422).json({errors: errors.array()
     })
         }
      let hashedPassword = Users.hashPassword(req.body.Password);
      Users.findOne({Username: req.body.Username}).then(
          (user) =>{
              if(user){
                  return res.status(400).send(req.body.Username + 'already exists');
              } else {Users.create({
                  Username: req.body.Username,
                  Password: hashedPassword, 
                  Email: req.body.Email,
                  Birthday: req.body.Birthday
              })
              .then ((user) => {res.status(201).json(user)}
              ).catch((error) => {console.error(error);
                res.status(500).send ('Error: ' + error);
            }) 
          }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
    })

  //Routing the update username request. (WORKS CORRECTLY)

  app.put('/users/:Username',passport.authenticate('jwt',{session: false}),
  [
    check('Username','Username is required').isLength({min:5}),
    check('Username', 'Username cannot contain non alphanumeric characters.').isAlphanumeric(),
    check('Password','Password is required.').not().isEmpty(),
    check('Email','Email does not appear to be valid.').isEmail()

],
  (req,res) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(422).json({errors: errors.array()
 })
     }
  let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({Username: req.params.Username},{$set:
        {
            Username: req.body.Username,
            Password: hashedPassword, 
            Email: req.body.Email, 
            Birthday: req.body.Birthday
        }
    },
        {new: true},
        (err, updatedUser) => {
            if(err){
                console.error(err); 
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
    });

  //Routing request to add a movie to a user's list of favorites. (WORKS CORRECTLY)

  app.post('/users/:Username/movies/:MovieId', passport.authenticate('jwt',{session: false}),
  (req,res) =>{
      Users.findOneAndUpdate({Username: req.params.Username},{
          $push: {FavoriteMovies: req.params.MovieId}
      },
      {new: true},
      (err, updatedUser) => {
          if (err) {
              console.error(err);
              res.status(500).send('Error:  ' + err);
          } else{
              res.json(updatedUser);
          }
      });
  });

  //Routing request to delete a movie from a user's list of favorites. (WORKS CORRECTLY)

  app.delete('/users/:Username/remvmovies/:MovieId', passport.authenticate('jwt',{session: false}),
  (req,res) =>{
      Users.findOneAndUpdate({Username: req.params.Username},{
          $pull:{
              FavoriteMovies: req.params.MovieId}
          },
          {new: true},
          (err, removeFavMovie) => {
              if (err){
                  console.error(err);
                  res.status(500).send('Error: ' + err);
              }else{
                  res.json(removeFavMovie);
              }
          });
  });

  //Routing a request to delete a user from the database. (WORKS CORRECTLY)

  app.delete('/users/remv/:Username',passport.authenticate('jwt',{session: false}),
  (req,res) =>{
      Users.findOneAndRemove({Username: req.params.Username})
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found.');
            } else{res.status(200).send(req.params.Username +' was deleted.');
            }
        })
        .catch((err) =>{
            console.error(err);
            res.status(500).send ('Error: '+ err);
        }
        )
      });

//Creating an error doce if a response fails. 
app.use ((err,req,res,next) => {
    console.error (err.stack);
    res.status (500).send('Something is wrong here :(');
});

//Logging a message to the console when port 8080 is accessed. 
const port = process.env.PORT || 8080;
app.listen(port,'0.0.0.0',() => {
    console.log('listening on Port ' + port)
});

app.listen(8080, () =>{
    console.log('Hey! FYI... This app is listening on port 8080...');
  });

  //Showing a message when any files with / are requested. More of a test than anything else. 
    app.get('/',(req,res)=>{
        res.send('What would Ted Lasso do?')
        }); 
    

//Adding mongo import code to connect database to cluster. 
/*
 mongoimport --uri mongodb+srv://willburgertest:<willburgertestpw>@clusterrb.4pinf.mongodb.net/<myFlixDB> --collection <movies> --type <json> --file </movielist.json>
 */
/*

 mongoimport --uri mongodb+srv://willburgertest:willburgertestpw@clusterrb.4pinf.mongodb.net/myFlixDB --collection movies --type json --file CareerFoundry/movie_api/movielist.json
^^^ Correct code - not correct file path. 



 mongoimport --uri mongodb+srv://myFlixDBadmin:12345@myflixdb.dcdfl.mongodb.net/myFlixDB --collection movies --type json --file ../exported_collections/movies.json

 */