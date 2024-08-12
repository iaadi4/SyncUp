import JWT from 'passport-jwt';
import envVariables from '../config/serverConfig.js';
import models from '../models/index.js';
const { SECRETORKEY } = envVariables;

const ExtractJwt = JWT.ExtractJwt;
const JwtStrategy = JWT.Strategy;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRETORKEY
}

const passportAuth = (passport) => {
    passport.use(new JwtStrategy(options, async function(jwt_payload, done) {
        const user = await models.User.findById(jwt_payload.id);
        if(!user) {
            done(null, false);
        }
        else {
            done(null, true);
        }
    }));
}

export default passportAuth;