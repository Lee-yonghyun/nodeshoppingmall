const express =require('express');
const router = express.Router();
const productModel = require('../models/product') //만들었던 db모델을 불러오기

//<데이터 CRUD>
//product data 불러오기 (get method를 사용하기)
router.get('/',(req,res)=> {

   productModel
       .find()
       .then(results => {
           res.json({
               count: results.length,
               products: results
           })
       })
       .catch(err => {
           res.json({
               message: err.message
           })
       })



    // res.json({
    //     message: 'product data 불러오기'
    // })
})
//product data 생성하기 (post 방식, 등록하기)
router.post('/',(req,res)=> {

    const newProduct = new productModel({
        name: req.body.productname,
        price:req.body.productprice
    })

    newProduct
        .save()
        .then(result => {
            res.json({
                message:"saved data",
                productInfo:result
            }) //저장되는 데이터 = result를 보여주겟다.
        })
        .catch(err => {
            res.json({
                message:err.message
            })
        })

    // const product={
    //     name:req.body.productname,
    //     price:req.body.productprice
    // }
    // res.json({
    //     message:'product data 생성하기',
    //     createdProduct:product
    // })

})

//product data update하기 (put방식)
router.put('/',(req,res)=> {
    res.json({
        message:'product data update 하기'
    })
})
//product data 삭제하기
router.delete('/:productId',(req,res)=>{

    productModel
        .findByIdAndRemove(req.params.productId)
        .then(_ => {
            res.json({
                message:"delete success"
            })
        }) //() or _ 는 굳이 result라고 정정해주지 않을때
        .catch(err => {
            res.json({
                message:err.message
            })
        })


    // res.json({
    //     message:'product data 삭제하기 '
    // })
})

// 일부분 데이터 불러오기 detailProduct :productId로 표현하면 가변!
router.get('/:productId',(req,res)=>{
    const id = req.params.productId //url에 존재하는 것을 쓸떄 params

    productModel //데이터가 어디 담겨 있냐!! 모델(그릇에 내용물도) 담겨있다.
        .findById(id)
        .then(result =>{
            res.json({
                message: "get product data from "+id,
                product: result
            })
        })
        .catch(err =>{
            res.json({
                message:err.message
            })
        })
})

module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)