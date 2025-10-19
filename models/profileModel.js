const mongoose = require('mongoose');
// const {Schema} = mongoose;

const dataSchema = mongoose.Schema({
    homecontent: Array,
    aboutcontent: Array,
    services: Array,
    skills: Array,
    projects: Array,
    contact: Array,
    isSubscribed: Array,
});

const dataModel = mongoose.model('Data', dataSchema);

module.exports = dataModel;