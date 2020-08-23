//mongo db사용을 위한 매니지먼트 불러오기
const mongoose = require('mongoose')

//상수화 시키기
const orderSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',//product에 있는 모델을 참고 하겠다.
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})

// module화 하기
module.exports = mongoose.model('order', orderSchema)