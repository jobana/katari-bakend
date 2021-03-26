import { UserController } from './../controllers/userController';

import { UserSchema, UserModel } from './../model/profile/user';
import { UtilKatari } from '../util/utils';

import * as passport from "passport";
import * as FacebookTokenStrategy from 'passport-facebook-token';
import * as passportLocal from "passport-local";
import * as passportJwt from "passport-jwt";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({ usernameField: "email" }, (email: string, password: string, done: any) => {
    UserModel.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        console.log('Entrando a passport localStrategy');
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `username ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            console.log('validando clave', password);
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: UtilKatari.JWT_SECRET
    }, function (jwtToken: any, done: any) {
        UserModel.findOne({ username: jwtToken.username }, function (err, user) {
            console.log('Entrando a passport fromAuthHeaderAsBearerToken');
            if (err) { return done(err, false); }
            if (user) {
                return done(undefined, user, jwtToken);
            } else {
                return done(undefined, false);
            }
        });
    }));


passport.use(new FacebookTokenStrategy({
    clientID: 'YOUR- CLIENT - ID - HERE',
    clientSecret: 'YOUR - CLIENT - SECRET - HERE'
},
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
        let user = new  UserController();
        user.upsertFbUser(accessToken, refreshToken, profile, function (err: any, user: any) {
            return done(err, user);
        });

    }));
