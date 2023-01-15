const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    username: String,
});

const exerciseSchema = new mongoose.Schema(
{
    username: String,
    description: String,
    duration: Number,
    date: String,
    id: String
});


//Model: collection name, schema
module.exports['exerciseUsers'] = mongoose.model('/exerciseUsers', userSchema);
module.exports['exercises'] = mongoose.model('/exercises', exerciseSchema);