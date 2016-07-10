const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    text: { type: String, maxlength: 1000 },
    occupied: { type: String, maxlength: 70 },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
