import 'dotenv/config';
import { status } from '../helpers/status';
import { checkForExistence } from '../helpers/dbOperations';
import { db } from '../database/connection';

const {adminRole, vendorRole, userRole, professionalRole } = process.env;

const adminOnly = (req, res, next) => {
    if( req.user.role !== adminRole){
        return res.sendStatus(status.unauthorized);
    }

    next();
};

const vendorOnly = (req, res, next) => {
    if( req.user.role !== vendorRole){
        return res.sendStatus(status.unauthorized);
    }

    next();
};

const userOnly = (req, res, next) => {
    if( req.user.role !== userRole){
        return res.sendStatus(status.unauthorized);
    }

    next();
};

const professionalOnly = (req, res, next) => {
    if( req.user.role !== professionalRole){
        return res.sendStatus(status.unauthorized);
    }

    next();
};

const verifiedVendor = (req, res, next) => {
    checkForExistence('vendors', { vendor_id:req.user.id, verified:true }).then(exists => {
        if(!exists){
            return res.status(status.forbidden).json({error:"Your account has not been verified"});
        }
        next();
    }).catch(err => {
        return res.status(status.notfound).json({error:"Unable to check vendor"})
    })
}

export{
    adminOnly,
    vendorOnly,
    userOnly,
    professionalOnly,
    verifiedVendor
}