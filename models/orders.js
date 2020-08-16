//mongo db사용을 위한 매니지먼트 불러오기
const mongoose = require('mongoose')

//설계하기
const orderSchema = new mongoose.Schema()

// module화 하기
module.exports = mongoose.model('order', orderSchema)