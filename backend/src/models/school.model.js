/*
 * Exercise: make School mongoose model
 export interface School {
  _id?:string;
  name:string;
  city: string;
  street: string;
  zipcode: number;
  classrooms?: string[];  // references for classroom entities
}

 */
const mongoose = require('mongoose');

const SchoolSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    city: {
        type: String,
        default: '',
        required: true
    },
    street: {
        type: String,
        default: '',
        required: true
    },
    zipcode: {
        type: Number,
        default: 0,
        required: true
    },
    classrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classrooms'
    }]
}, {
    timeStamps: true
});

module.exports = mongoose.model('school', SchoolSchema);