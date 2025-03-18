const validator = require('../helpers/validate');
const ObjectId = require('mongodb').ObjectId;

const passAccounts = (req, res, next) => {
    const validationRule = {
        username: 'required|string|min:6',
        password: 'required|string|min:8',
        email: 'required|email',
        recoveryEmail: 'required|email',
        birthday: 'string',
        gender: 'string',
        accountDate: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const passGames = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        publishedYear: 'integer',
        genres: 'required|array',
        developer: 'required|string',
        progLanguage: 'required|string',
        version: 'string',
        ageRating: 'required|integer'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const passId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Id is not valid');
        //return;
    } else {
        next();
    };
}

module.exports = {
    passAccounts,
    passGames,
    passId
};