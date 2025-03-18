const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getAccounts = async (req, res) => {
    //#swagger.tags=['Accounts']
    const result = await mongodb.getDatabase().db().collection('accounts').find();
    result.toArray().then((accounts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(accounts);
    });
}

const getOneAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('accounts').find({ _id: contactId });
    result.toArray().then((accounts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(accounts);
    });
}

const createAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const contact = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        recoveryEmail: req.body.recoveryEmail,
        birthday: req.body.birthday,
        gender: req.body.gender,
        accountDate: req.body.accountDate
    };
    const response = await mongodb.getDatabase().db().collection('accounts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the account.')
    }
};

const updateAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        recoveryEmail: req.body.recoveryEmail,
        birthday: req.body.birthday,
        gender: req.body.gender,
        accountDate: req.body.accountDate
    };
    const response = await mongodb.getDatabase().db().collection('accounts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the account.')
    }
};

const deleteAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('accounts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the account.')
    }
};

module.exports = {
    getAccounts,
    getOneAccount,
    createAccount,
    updateAccount,
    deleteAccount
};