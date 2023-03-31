const asyncHandler = require('express-async-handler')
const Orden = require('../models/ordenModel')

const getOrdenes = asyncHandler(async(req,res) => {
    const ordenes = await Orden.find({user: req.user.id})

    res.status(200).json(ordenes)
})

const setOrdenes = asyncHandler(async(req,res) => {

    if(!req.body.producto || (!req.body.cantidad) || (!req.body.preciou) || (!req.body.preciot)){     //? TEXTO es el nombre del campo
        //res.status(400).json({mensaje: 'Favor de teclear la descripcion de la tarea '})
        res.status(400)
        throw new Error('Favor de teclear tu orden ')
    }

    const orden = await Orden.create({
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        preciou: req.body.preciou,
        preciot: req.body.preciot,
        user: req.user.id
    })

    //res.status(201).json({mensaje:'Escribre un nombre de auto descente'}) //? Si quiero solo ver el mensaje es esta linea y si quiero la informacion pues la de abajo
    res.status(201).json(orden)
})

const updateOrdenes = asyncHandler(async(req,res) => {

    const orden = await Orden.findById(req.params.id)

    if (!orden) {
        res.status(400)
        throw new Error('Orden no encontrada')
    }

    // //? Verificamos q el auto pertenece al usuario del token 
    if(orden.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso No Autorizado, esta orden no pertenece al usuario logeado')
    }

    const ordenModificada = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(ordenModificada)
})

const deleteOrdenes = asyncHandler(async(req,res) => {

    const orden = await Orden.findById(req.params.id)

    if(!orden) {
        res.status(400)
        throw new Error ('Orden no encontrado')
    }

    if(orden.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso No Autorizado, esta orden no pertenece al usuario logeado')
    }

    // await tarea.remove    //? Esta solo la borra si existe
    await orden.deleteOne()
    //const autoBorrado = await Auto.findByIdAndDelete(req.params.id)  //? Es correcta pero ya no tiene caso q ponga cual va a borrar


    res.status(200).json({id: req.params.id})
})



module.exports = {
    getOrdenes,
    setOrdenes,
    updateOrdenes,
    deleteOrdenes
}