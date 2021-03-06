/**
 * @file the Index.js file is the nexus of all major aspects of the API.
 * It establishes the Express app and creates the server.
 * API endpoints are created for all app requests. 
 * Request routes follow the mongoose models detailed in models.js.
 * Authentication is managed in the passport.js file. 
 * The database is powered by MongoDB Atlas. 
 * The server is powered by Heroku. 
 * @requires express --- necessary to manage the Express web framework, URL, and API capabilities
 * @requires express-validator --- middleware for Express that supports server-side validation
 * @requires mongoose --- manages the connection between the app and database and maps data using models
 * @requires cors --- control allowed origins for requests
 * @requires ./auth.js --- where the login process is controlled and tokens are generated
 * @requires ./models.js --- where data schemas are mapped for mongoose
 * @requires morgan --- logs requests made to the database
 * @requires passport --- manages the authentication and authorization requests
 */

const express = require('express'), // Importing express
    morgan = require('morgan'), // Importing morgan 
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),//importing bodyParser 
    Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

/*
mongoose.connect('mongodb://localhost:27017/myFlixDB',{useNewUrlParser: true,
useUnifiedTopology: true})*/

mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) //Environment variable to guide credentials set via Heroku. 


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { check, validationResult } = require('express-validator');

const cors = require('cors');
app.use(cors()); // This makes the app available to all requests.


/*let allowedOrigins = ['http://localhost:8080', 'https://busch-movie-api.herokuapp.com/', 'http://localhost:1234'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn???t found on the list of allowed origins
            let message = 'The CORS policy for this application doesn???t allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));*/



let auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');

app.use(morgan('common')); //Using morgan middleware to log requests. 
app.use(express.static('public')); // Routing static file requests to the public folder. 



//Routing requests for all movies. (WORKS CORRECTLY)
/**
 * A GET request that returns all movies to the user
 * @method GET
 * @param {string} URL
 * @requires authentication 
 * @returns {Object} An array of all the movie records in the database.
 */
app.get('/movies', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Movies.find()
            .then((movies) => {
                res.status(201).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });

//Routing requests for a single movie based on title. (WORKS CORRECTLY) 
/**
 * A GET request that returns a single movies to the user by title
 * @method GET
 * @param {string} URL
 * @requires authentication 
 * @returns {Object} An object containing the movie details.
 */

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Movies.findOne({ Title: req.params.Title })
            .then((movie) => {
                res.json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });



//Routing requests for genre information. (WORKS CORRECTLY) 
/**
 * A GET request that returns genre information by name
 * @method GET
 * @param {string} URL
 * @requires authentication 
 * @returns {object} with genre information
 */

app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Movies.find({ 'Genre.Name': req.params.Name })
            .then((genreType) => {
                res.json(genreType);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });

//Routing reqeusts for director information. (WORKS CORRECTLY)
/**
 * A GET request that returns director information by name 
 * @method GET
 * @param {string} URL
 * @requires authentication 
 * @returns {object} with director information
 */

app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Movies.find({ 'Director.Name': req.params.Name })
            .then((directorName) => {
                res.json(directorName);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });

    });


//Routing the new user registration request. (WORKS CORRECTLY) 
/**
 * @method POST 
 * @param {string} URL 
 * @param {object} validationChain checks elements of post request to confirm required elements
 * @returns {object} - the new user is returned
 * 
 */

app.post('/users', [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username cannot contain non alphanumeric characters.').isAlphanumeric(),
    check('Password', 'Password is required.').not().isEmpty(),
    check('Email', 'Email does not appear to be valid.').isEmail()

],

    (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({ Username: req.body.Username }).then(
            (user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + 'already exists');
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                        .then((user) => { res.status(201).json(user) }
                        ).catch((error) => {
                            console.error(error);
                            res.status(500).send('Error: ' + error);
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
    })

//Routing the update username request. (WORKS CORRECTLY)
/**
 * @method PUT 
 * @requires authentication 
 * @param {string} URL 
 * @param {object} validationChain checks elements of post request to confirm required elements
 * @returns {object} returns an object with the updated user details
 */

app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username cannot contain non alphanumeric characters.').isAlphanumeric(),
        check('Password', 'Password is required.').not().isEmpty(),
        check('Email', 'Email does not appear to be valid.').isEmail()

    ],
    (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOneAndUpdate({ Username: req.params.Username }, {
            $set:
            {
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(updatedUser);
                }
            });
    });

//Routing a request to get a user by username
/**
 * @method GET
 * @requires authentication 
 * @param {string} URL 
 * @returns {object} returns an object with the user details
 */
app.get('/users/:Username', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Users.findOne({ Username: req.params.Username })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error:' + err);
            });
    });

//Routing request to add a movie to a user's list of favorites. (WORKS CORRECTLY)
/**
 * @method POST
 * @requires authentication 
 * @param {string} URL 
 * @returns {object} returns an object with the updated user details including favorite movies
 */
app.post('/users/:Username/movies/:MovieId', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.Username }, {
            $push: { FavoriteMovies: req.params.MovieId }
        },
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error:  ' + err);
                } else {
                    res.json(updatedUser);
                }
            });
    });

//Routing request to delete a movie from a user's list of favorites. (WORKS CORRECTLY)
/**
 * @method DELETE
 * @requires authentication 
 * @param {string} URL 
 * @returns {object} returns an object with the updated user details reflecting the recent deletion
 */
app.delete('/users/:Username/remvmovies/:MovieId', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.Username }, {
            $pull: {
                FavoriteMovies: req.params.MovieId
            }
        },
            { new: true },
            (err, removeFavMovie) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(removeFavMovie);
                }
            });
    });

//Routing a request to delete a user from the database. (WORKS CORRECTLY)
/**
 * @method DELETE
 * @requires authentication 
 * @param {string} URL 
 * @returns {string} A message is returned stating "<USERNAME> was deleted"
 */
app.delete('/users/remv/:Username', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Users.findOneAndRemove({ Username: req.params.Username })
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.Username + ' was not found.');
                } else {
                    res.status(200).send(req.params.Username + ' was deleted.');
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            }
            )
    });

//Creating an error doce if a response fails. 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is wrong here :(');
});

//Logging a message to the console when port 8080 is accessed. 
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('listening on Port ' + port)
});

/*app.listen(8080, () =>{
    console.log('Hey! FYI... This app is listening on port 8080...');
  });*/

//Routing request for documentation.
app.get('/', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname })
});


//Adding mongo import code to connect database to cluster. 

/*
 mongoimport --uri mongodb+srv://willburgertest:willburgertestpw@clusterrb.4pinf.mongodb.net/myFlixDB --collection movies --type json --file movie.json
^^^ Correct code file doesn't need a / before it because it's already in the root.*/



