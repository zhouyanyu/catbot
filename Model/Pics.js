const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PicsModelSchema = new Schema({
    url:String,
    uniUrl:String,
    date:String
})

const PicsModel = mongoose.model('pics',PicsModelSchema)
module.exports = PicsModel;