const mongoose = require('mongoose');

const InvestorContact= new mongoose.Schema({
    
    FullName: { type: String, required: true },
    Email: { type: String },
    City: { type: String, required: true },
    Message: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update the updatedAt field before saving
InvestorContact.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('InvestorContact', InvestorContact);