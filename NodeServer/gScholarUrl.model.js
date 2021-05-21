const mongoose = require('mongoose');

const gScholarUrlSchema = mongoose.Schema({
    gSearchParent : String,
    baseUrl : String,
    fullUrl : String,

    totalIds: Number,
    thisId: Number,

	sessionName: String,

    date: mongoose.SchemaTypes.Date
});

module.exports = mongoose.model('gScholarUrlSchema', gScholarUrlSchema);
