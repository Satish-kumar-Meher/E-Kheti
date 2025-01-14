import session from "express-session"
import passport from "passport"
import { Strategy as GoogleStategy } from "passport-google-oauth20"
// import { Strategy as FacebookStrategy } from "passport-facebook";

const passportUtil = app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new GoogleStategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/ekheti/v1/g-auth/google/callback",
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, callback) => {
        callback(null, profile)
      }
    )
  )


  // // Facebook OAuth Strategy
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: process.env.FACEBOOK_CLIENT_ID,
  //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //       callbackURL: "/ekheti/v1/fb-auth/facebook/callback",
  //       profileFields: ["id", "displayName", "photos", "email"],
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       done(null, profile);
  //     }
  //   )
  // );

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}

export default passportUtil