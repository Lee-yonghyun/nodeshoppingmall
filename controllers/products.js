const productModel = require('../models/product')


exports.products_get_all = (req,res)=> {

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
};


exports.products_created_product = (req,res)=> {

    const {name, price} = req.body

    const newProduct = new productModel({
        name,
        price
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
};

exports.products_get_product = (req,res)=>{
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
};

exports.products_delete_product = (req,res)=>{

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
};

exports.products_update_product = (req,res)=> {
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
};
