const productModel = require('../models/product')
const orderModel = require('../models/orders')

exports.orders_get_all = (req,res)=>{

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
};

exports.orders_get_product = (req,res)=>{
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
};

exports.orders_created_order = (req,res)=>{

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
};

exports.orders_delete_order = (req,res)=>{

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
};

exports.orders_update_order =(req,res)=>{

    const id = req.params.orderid
    const updateOps={}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    orderModel
        .findByIdAndUpdate(id,{$set:updateOps})
        .then(_=>{
            res.json({
                message:"update success",
                request:{
                    type:"GET",
                    url:'http://localhost:5000/orders/'+id
                }
            })
        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })
};