const express =require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.json({
        message:'order data 불러오기'
    })
})

router.post('/',(req,res)=>{
    res.json({
        message:'order data 생성하기'
    })
})
router.put('/',(req,res)=>{
    res.json({
        message:'order data update하기'
    })
})
router.delete('/',(req,res)=>{
    res.json({
        message:'order data 삭제하기'
    })
})

module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)