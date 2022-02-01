// import 'dotenv/config';
// import passport from 'passport';
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
//   }
// ));

//======================================================server

// import express from 'express';
// import cors from 'cors';
// import routes from './app2/routes/routes';
// import { ValidationError } from 'express-validation';


// const app = express();
// const port = process.env.PORT || 6000;

  
// app.use(cors());
// app.use(express.json());


// //routes
// routes(app);

// //Global error handler
// app.use(function(err, req, res, next) {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err)
//   }
 
//   return res.status(500).json(err)
// })

// //Route handler
// app.use( (req, res, next)=>{
//   res.status(404);
//   if (req.accepts('json')) {
//     res.send({error: true, message: 'Route Not found' });
//     return;
//    }
// });


// app.listen(port, ()=>{
//   console.log('app is listening on port '+ port);
// });

// "build": "babel app -d app2",