const mongoose = require('mongoose')

const ordenSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    producto: {
        type: String,
        required: [true, 'Por favor teclea el nombre del producto']
    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor escribe el numero de productos']
    },
    preciou: {
        type: Number,
        required: [true, 'Por favor teclea el precio']
    },
    preciot: {
        type: Number,
        required: [true, 'Por favor teclea el total']
    }
}, {
    timestamps: true
}) 

module.exports = mongoose.model('Orden', ordenSchema)