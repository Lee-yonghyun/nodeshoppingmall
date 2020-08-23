const express =require('express');
const router = express.Router();
const orderModel = require('../models/orders')
const productModel = require('../models/product')

router.get('/',(req,res)=>{

    orderModel
        .find()
        .populate('product', ['name','price']) //productid로 찾는것!!!
        .then(results=>{
            console.log("------------------- >", results)
            const response = {
                count:results.length,
                orders:results.map(result=>{
                    return{
                        id:result._id,
                        productId:result.product,
                        quantity:result.quantity,
                        request:{
                            type:"GET",
                            url:"http://localhost:5000/orders/"+result._id
                        }
                    }
                })
            }
            res.json(response)
        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })

    // res.json({
    //     message:'order data 불러오기'
    // })
})

router.post('/',(req,res)=>{

    productModel
        .findById(req.body.productId)
        .then(product =>{
                const newOrder = new orderModel({
                    product:req.body.productId,
                    quantity:req.body.odquantity
                })

                newOrder
                    .save()
                    .then(result=>{
                        res.json({
                            message:'saved data',
                            orderInfo:{
                                id:result._id,
                                productid:result.product,
                                quantity:result.quantity,
                                request:{
                                    type:'GET',
                                    url:"http://localhost:5000/orders/"+result._id
                                }
                            }
                        })
                    })
                    .catch(err=>{
                        res.json({
                            message:err.message
                        })
                    })
        })
        .catch(err=>{
            res.json({
                message:'product not found'
            })
        })
    // const newOrder = new orderModel({
    //     product:req.body.productId,
    //     quantity:req.body.odquantity
    // })
    //
    // newOrder
    //     .save()
    //     .then(result=>{
    //         res.json({
    //             message:'saved data',
    //             orderInfo:{
    //                 id:result._id,
    //                 productid:result.product,
    //                 quantity:result.quantity,
    //                 request:{
    //                     type:'GET',
    //                     url:"http://localhost:5000/orders/"+result._id
    //                 }
    //             }
    //         })
    //     })
    //     .catch(err=>{
    //         res.json({
    //             message:err.message
    //         })
    //     })
})
router.put('/:orderId',(req,res)=>{

    // res.json({
    //     message:'order data update하기'
    // })
})
router.delete('/:orderId',(req,res)=>{

    orderModel
        .findByIdAndRemove(req.params.orderId)
        .then(_=>{
            res.json({
                message:"delete success",
                request:{
                    type:"GET",
                    url:"http://localhost:5000/orders"
                }
            })
        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })
    // res.json({
    //     message:'order data 삭제하기'
    // })
})

router.get('/:orderId',(req,res)=>{
    const id = req.params.orderId

    orderModel
        .findById(id)
        .populate('product', ['name','price'])
        .then(result =>{
            // console.log(result)
            res.json({
                message:'get order data from'+id,
                order:{
                    id:result._id,
                    productId:result.product,
                    quantity:result.quantity,
                    request:{
                        type:"GET",
                        url:"http://localhost:5000/orders/"
                    }
                }

            })
        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })

})

module.exports= router; //라우터를 모듈화 시켜서 (모듈화 시키는 방법 module.exports)