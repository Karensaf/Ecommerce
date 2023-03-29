const express = require('express')
const router = express.Router()
const { getProductos, setProductos, updateProductos, deleteProductos } = require('../controllers/productoController')

router.route('/').get(getProductos).post(setProductos)
router.route('/:id').put(updateProductos).delete(deleteProductos)



module.exports = router