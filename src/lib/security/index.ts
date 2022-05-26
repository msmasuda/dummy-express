import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";

// 1 passport-localの設定
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username: string, password: string, done: any) => {
      if (username === "hoge" && password === "fuga") {
        return done(null, username);
      } else {
        return done(null, false, {
          message: "usernameまたはpasswordが違います",
        });
      }
    }
  )
);

// 2 passport-jwtの設定
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, (jwt_payload: any, done: any) => {
    done(null, jwt_payload);
  })
);

// 3 passportをexport
export default passport;
