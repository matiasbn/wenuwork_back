const mongoose = require('mongoose');
const AutoModel = require('./autos')

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    _id: Schema.Types.ObjectId,
    rut: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    auto: [{ type: Schema.Types.ObjectId, ref: 'Autos' }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);