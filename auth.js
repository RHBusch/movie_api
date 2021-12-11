//Creating a file for authorization/authentication code

const jwtSecret = 'your_jwt_secret'; //Check key used in JWT strategy for consistency

const jwt = require('jsonwebtoken'),
    passport = require('passport');
 
require('./passport');//What is my local passport file?

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret,{
        subject: user.Username, //the encoded username
        expiresIn: '7d', //when the token expires
        algorithm: 'HS256'});//encoding JWT
    
}

//What happens after login? 

module.exports = (router) => {
    router.post('/login', (req,res) =>{
        passport.authenticate('local',{session: false},
            (error,user,info) => {
                if(error || !user){
                    return res.status(400).json({
                        message: 'Something is not right',
                        user: user});
                }
                req.login(user, {session: false},(error) =>
                {if (error){res.send(error)}
                let token = generateJWTToken(user.toJSON());
                return res.json({user,token});
                })    
            })(req,res);
        });
    }



    module.exports = (router) => {
        router.post('/login', (req, res) => {
          passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
              return res.status(400).json({
                message: 'Something is not right',
                user: user
              });
            }
            req.login(user, { session: false }, (error) => {
              if (error) {
                res.send(error);
              }
              let token = generateJWTToken(user.toJSON());
              return res.json({ user, token });
            });
          })(req, res);
        });
      }


      

