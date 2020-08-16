//1 db설계하는 방법
const mongoose = require('mongoose')

//2 #schema라 하면 하나의 셀을 의미(name과 price)
const productSchema = mongoose.Schema({
    name:String,
    price:Number
})

//3 >> model의 이름은 product 이고 ,내용은 productschema로 하겠다.
module.exports = mongoose.model("product",productSchema)