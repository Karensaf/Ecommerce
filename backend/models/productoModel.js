const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'Por favor escribe el producto que buscas']
    },
    categoria: {
        type: String,
        required: [true, 'Por favor escribe la categoria del producto que buscas']
    },
    marca: {
        type: String,
        required: [true, 'Por favor escribe la categoria del producto que buscas']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor escribe la categoria del producto que buscas']
    }
}, {
    timestamps: true
}) 

module.exports = mongoose.model('Producto', productoSchema)