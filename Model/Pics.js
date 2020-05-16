const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PicsModelSchema = new Schema({
    url:String
})

const PicsModel = mongoose.model('PicsModel',PicsModelSchema)
module.exports = PicsModel;