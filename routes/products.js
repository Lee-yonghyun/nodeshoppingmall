const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const {
    products_get_all,
    products_created_product,
    products_get_product,
    products_delete_product,
    products_update_product
} = require('../controllers/products') //direct로 불러오기!




//<데이터 CRUD>
//product data 불러오기 (get method를 사용하기)
router.get('/', products_get_all)




//product data 생성하기 (post 방식, 등록하기)
router.post('/', checkAuth, products_created_product)



//product data update하기 (put방식)
router.put('/:productId', checkAuth, products_update_product)



//product data 삭제하기
router.delete('/:productId', checkAuth ,products_delete_product)



// 일부분 데이터 불러오기 detailProduct :productId로 표현하면 가변!
router.get('/:productId', products_get_product)




module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)