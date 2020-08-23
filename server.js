const express = require('express'); //express 설치한거 불러오기
const app =express(); // express 함수를 사용하도록 연결하기 (함수모음)
const morgan =require('morgan');
const bodyParser= require('body-parser');
// const mongoose = require('mongoose')
const dotEnv = require('dotenv')
dotEnv.config() //구성하겠다.
require('./config/database')

const productRoutes = require('./routes/products')
const orderRoutes=require('./routes/orders')
const userRoutes = require('./routes/user')

app.use(morgan('dev'));
// app.use(morgan('common')); //다른 형식
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//카테고리화 = 라우터(routes) 서버를 여러가지 갈래로 연결하기
//1) product 라우터 만들어 보기!, 2) order 라우터 만들어 보기


app.use('/products' , productRoutes); // .use(req,res) 이므로 5000/product가 요청들어오면, req는 productRoutes로 보낸다.
app.use('/orders',orderRoutes);
app.use('/users',userRoutes)

//데이터 베이스 연결 (데이터베이스 비번과 dbname 설정해주기)
// const dboptions =  {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true
// } //mongodb options 기본설정
// // const dbadress = "mongodb+srv://dydwk231:vnfms231@cluster0.xgwjf.mongodb.net/shoppingmall?retryWrites=true&w=majority"
//
// mongoose
//     .connect(process.env.MONGO_URI, dboptions)
//     .then(() => console.log("MongoDB Connerted..."))
//     .catch(err => console.log(err.message));



const PORT = process.env.PORT || 5111; // 안될경우 5111로 포트 대체
app.listen(PORT, console.log('server started')); // 포트번호를 지정하기, 로그를 찍어준다. .>>호출, 서버가 만들어짐



