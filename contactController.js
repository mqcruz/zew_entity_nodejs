// contactController.js

let mongoose = require('mongoose');

// Import contact model
Contact = require('./contactModel');
// Handle index actions
/**
 * @swagger
 * /api/contacts:
 *  get:
 *    description: Use to request all contacts
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.index = function (req, res) {
    Contact.get(function (err, contact) {
        if (err) {
            res.status(401).json({
                status: "error",
                message: err,
            });
        }
        res.status(200).json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contact
        });
    });
};


exports.new = function (req, res) {
    var contact = new Contact();
    contact.zewName = req.body.zewName ? req.body.zewName : contact.zewName;
    contact.contactEmail = req.body.contactEmail;
// save the contact and check for errors
    contact.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById( req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};