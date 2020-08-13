const express =require('express');
const router = express.Router();


//<데이터 CRUD>
//product data 불러오기 (get method를 사용하기)
router.get('/total',(req,res)=> {
    res.json({
        message: 'product data 불러오기'
    })
})
//product data 생성하기 (post 방식, 등록하기)
router.post('/registor',(req,res)=> {
    res.json({
        message:'product data 생성하기'
    })
})

//product data update하기 (put방식)
router.put('/',(req,res)=> {
    res.json({
        message:'product data update 하기'
    })
})
//product data 삭제하기
router.delete('/',(req,res)=>{
    res.json({
        message:'product data 삭제하기 '
    })
})



module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)