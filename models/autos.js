const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let autoSchema = new Schema({
    marca: {
        type: String,
        required: [true, 'La marca es necesaria']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es necesario']
    },
    year: {
        type: String,
        required: [true, 'El año es neceasrio']
    }
});


module.exports = mongoose.model('Autos', autoSchema);