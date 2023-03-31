const express = require('express')
const router = express.Router()
const { setOrdenes, getOrdenes, updateOrdenes, deleteOrdenes } = require('../controllers/ordenController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect,getOrdenes).post(protect, setOrdenes)
router.route('/:id').put(protect, updateOrdenes).delete(protect, deleteOrdenes)



module.exports = router