const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const {
    orders_get_all,
    orders_get_product,
    orders_created_order,
    orders_delete_order,
    orders_update_order
}  = require('../controllers/orders')

router.get('/',checkAuth,orders_get_all)



router.post('/',checkAuth,orders_created_order)



router.put('/:ordeid',checkAuth,orders_update_order)



router.delete('/:orderId',checkAuth,orders_delete_order)



router.get('/:orderId',checkAuth,orders_get_product)



module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)