// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var contactSchema = mongoose.Schema({
    zewName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    gender: String,
    contactPhone: String,
    lastAccess: {
        type: Date,
        default: Date.now
    }
},{ collection: 'contact' });
// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}