import passport from "passport";

const auth = async(req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if(err) return next(err);
        if(!user) {
            return res.status(401).json({
                message: 'unauthorized access'
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}

export default auth;