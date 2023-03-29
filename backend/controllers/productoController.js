const asyncHandler = require('express-async-handler')
const Producto = require('../models/productoModel')

const getProductos = asyncHandler( async (req, res) => {

    const productos = await Producto.find()

    // res.status(200).json({mensaje: 'Mostrar los productos'})
    res.status(200).json(productos)
})

const setProductos = asyncHandler( async (req, res) => {
    // console.log(req.body)
    if(!req.body.nombre || (!req.body.categoria) || (!req.body.marca) || (!req.body.sku) || (!req.body.precio)){
        // res.status(400).json({mensaje: 'Favor de teclear la descripcion del producto'})
        res.status(400)
        throw new Error('Favor de teclear la descripcion del producto ')
    }
    // res.status(201).json({mensaje: 'Crear un Producto'})
    const tarea = await Producto.create({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        marca: req.body.marca,
        sku: req.body.sku,
        precio: req.body.precio,
    })

    res.status(201).json(tarea)
})

const updateProductos = asyncHandler( async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }
    const productoModificado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(productoModificado)
    // res.status(200).json({mensaje: `Modificar el Producto ${req.params.id}`})
})

const deleteProductos = asyncHandler( async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }
    await producto.deleteOne()

    res.status(200).json({id: req.params.id})
    // res.status(200).json({mensaje: `Borrar el Producto ${req.params.id}`})
})




module.exports = {
    getProductos,
    setProductos,
    updateProductos,
    deleteProductos
}