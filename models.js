// This is where the Mongoose models will live. //
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

//Establishing schema for the movie database.

let movieSchema = mongoose.Schema({
    Title: {type: String, required:true},
    Description: {type: String, required:true},
    Genre:{
        Name: String,
        Description: String
    },
    Director:{
        Name: String, 
        Bio: String
    },
    Ratings: {
        IMDB: String,
        RottenTomatoes: String 
    },
    ImagePath: String, 
    Featured: Boolean
});

//Establishing schema for the users database.

let userSchema = mongoose.Schema({
    Username:{type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date, 
    FavoriteMovies: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//Assigning variables Movie/User to their respective schemas. 

let Movie = mongoose.model('Movie', movieSchema);

let User = mongoose.model('User', userSchema);

// Exporting modules for use in index.js

module.exports.Movie = Movie; 
module.exports.User = User;

