const mongoose = require('mongoose');
var Schema= mongoose.Schema;
var typeSchema = Schema({
    typename: { type: String, required: true }
});
module.exports = mongoose.model('Type', typeSchema);