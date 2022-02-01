import 'dotenv/config';
import { status } from '../helpers/status';
import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.accessTokenSecret, (err, user) => {
            if(err){
                if(err.name === 'TokenExpiredError'){
                    return res.status(status.unauthorized).json({error: err.message});
                }
                return res.status(status.unauthorized).json({error:"Invalid token"});
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(status.unauthorized);
    }
};

const authenticateGuest = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.guestTokenSecret, (err, user) => {
            if(err){
                return res.status(status.unauthorized).json({error:"Invalid token"});
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(status.unauthorized);
    }
};

export{
    authenticateJWT,
    authenticateGuest
}