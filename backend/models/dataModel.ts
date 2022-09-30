//Define data model for rainbow connection user 
const mongoose = require('mongoose')
import {Schema} from 'mongoose'

const dataSchema = mongoose.Schema(
    {
        fullname : {
            type: String,
            required: true,
        },
        color : {
            type: String,
            required: true,
        },
        connections : {
            type: Array,
            required: true,
        }
    },
    {
        timeStamps: true
    }
);

module.exports = mongoose.models.rainbowconnections || mongoose.model('rainbowconnections', dataSchema)