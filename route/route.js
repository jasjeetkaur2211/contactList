const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//retrieving contacts
router.get('/contacts', (req, res, next)=>{
    Contact.find(function (err, contacts){
        res.json(contacts);
    });
});

//add contact
router.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    newContact.save((err, contact) => {
        if(err){
            res.json({msg: 'failed to add contact'});
        } else {
            res.json({msg: 'Contact added successfully:'+ contact });
        }
    })
});

//delete contact
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({_id:req.params.id}, function (err, result) {
        if(err){
            res.json(err);
        } else{
            res.json(result)
        }
    });
});

module.exports = router;