'use strict';
const passport = require('passport');
const environment = require('../environment');
const userService = require('../services/user.service');
const { Strategy } = require('passport-local');
const { ERROR_CODES } = require('./error-handler.service');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const initPassport = () => {
    // serialize: store user id in session
    passport.serializeUser(async (user, done) => {
        console.log('serializeUser', user);
        done(null, user);
    });

    // deserialize: get user id from session and get all user data
    passport.deserializeUser(async (userId, done) => {
        // get user data by id from getUser
        console.log('deserialize', userId);
        const user = await userService.getById(userId);
        console.log('deserialize: ', user);
        done(null, user);

        // deserialize user by adding it to 'done()' callback
    });

    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: environment.JWT_SECRET,
                issuer: environment.JWT_ISSUER,
                audience: environment.JWT_AUDIENCE
            },
            async function (payload, done) {
                console.log({ payload });
                const user = await userService.getById(payload.sub);
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            }
        )
    );

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                session: false,
                passReqToCallback: true
            },
            async (request, username, password, done) => {
                const user = await userService.getByEmail(username);

                if (!user) {
                    done(null, false);
                }

                if (user.password === password) {
                    return done(null, user);
                }

                done(null, false);
            }
        )
    );
};

const handleTokenUser = () => {
    return (req, res, next) => {
        const userId = req.params['id'] ?? '';
        if (userId === 'token') {
            res.send({ user: req.user });
            return;
        }
        next();
    };
};

const authenticateJWT = () => {
    return (req, res, next) => {
        passport.authenticate(
            'jwt',
            { session: false },
            (error, user, info, status) => {
                console.log({ error, user, info, status });
                if (info?.name === 'TokenExpiredError') {
                    return res.status(401).send({
                        code: ERROR_CODES.EXPIRED_TOKEN
                    });
                }
                if (info?.name === 'JsonWebTokenError') {
                    return res.status(401).send({
                        code: ERROR_CODES.BAD_TOKEN
                    });
                }
                if (error || !user || info || status) {
                    return res.status(401).send({
                        code: ERROR_CODES.BAD_TOKEN
                    });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return next();
                });
            }
        )(req, res, next);
    };
};
module.exports = {
    handleTokenUser: handleTokenUser,
    initPassport: initPassport,
    authenticateJWT: authenticateJWT
};
