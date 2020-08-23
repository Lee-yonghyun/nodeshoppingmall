const express =require('express');
const router = express.Router();
const productModel = require('../models/product') //만들었던 db모델을 불러오기

//<데이터 CRUD>
//product data 불러오기 (get method를 사용하기)
router.get('/',(req,res)=> {

   productModel
       .find()
       .then(results => {
           const response = {
               count:results.length,
               products:results.map(result => {
                   return{
                       id:result._id,
                       name:result.name,
                       price:result.price,
                       request:{
                           type:"GET",
                           url:"http://localhost:5000/products/" + result._id
                       }
                   }
               })
           }
           res.json(response)

           // res.json({
           //     count: results.length,
           //     products: results
           // })
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
                productInfo:{
                    id:result._id,
                    name:result.name,
                    price:result.price,
                    request:{
                        type:'GET',
                        url:"http://localhost:5000/products/" + result._id // detail get data 자동화해주기
                    }
                }
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
router.put('/:productId',(req,res)=> {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body){
        console.log(ops)
        updateOps[ops.propName] =ops.value;
    }

    productModel
        .findByIdAndUpdate(id,{$set: updateOps}) //update 대상은 id에 해당하는 것, 내용은 updateops로 수정
        .then(_=>{
            // console.log("result is ", _)
            res.json({
                message:'update success',
                request:{
                    type:'GET',
                    url:'http://localhost:5000/products/'+ id
                }
            })
        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })

    // res.json({
    //     message:'product data update 하기'
    // })
})
//product data 삭제하기
router.delete('/:productId',(req,res)=>{

    productModel
        .findByIdAndRemove(req.params.productId)
        .then(_ => {
            res.json({
                message:"delete success",
                request1:{
                    type:"GET",
                    url:"http://localhost:5000/products"
                }
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
                product: {
                    id:result._id,
                    name:result.name,
                    price:result.price,
                    request: {
                        type:"GET",
                        url:"http://localhost:5000/products/"
                    }
                }
            })
        })
        .catch(err =>{
            res.json({
                message:err.message
            })
        })
})

module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)