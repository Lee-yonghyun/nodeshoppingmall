const mongoose = require('mongoose')

const dboptions =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
} //mongodb options 기본설정
// const dbadress = "mongodb+srv://dydwk231:vnfms231@cluster0.xgwjf.mongodb.net/shoppingmall?retryWrites=true&w=majority"

mongoose
    .connect(process.env.MONGO_URI, dboptions)
    .then(() => console.log("MongoDB Connerted..."))
    .catch(err => console.log(err.message));