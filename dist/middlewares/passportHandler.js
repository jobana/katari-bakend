"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controllers/userController");
const user_1 = require("./../model/profile/user");
const utils_1 = require("../util/utils");
const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const passportLocal = require("passport-local");
const passportJwt = require("passport-jwt");
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    user_1.UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
        console.log('Entrando a passport localStrategy');
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `username ${email} not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            console.log('validando clave', password);
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: utils_1.UtilKatari.JWT_SECRET
}, function (jwtToken, done) {
    user_1.UserModel.findOne({ username: jwtToken.username }, function (err, user) {
        console.log('Entrando a passport fromAuthHeaderAsBearerToken');
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user, jwtToken);
        }
        else {
            return done(undefined, false);
        }
    });
}));
passport.use(new FacebookTokenStrategy({
    clientID: 'YOUR- CLIENT - ID - HERE',
    clientSecret: 'YOUR - CLIENT - SECRET - HERE'
}, function (accessToken, refreshToken, profile, done) {
    let user = new userController_1.UserController();
    user.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
        return done(err, user);
    });
}));
//# sourceMappingURL=passportHandler.js.map