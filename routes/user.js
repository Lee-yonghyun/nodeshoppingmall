const express = require('express')
const router = express.Router()
const userModel = require('../models/user')

// 회원가입
router.post('/signup',(req,res)=>{

    const newUser = new userModel({
        name:req.body.username,
        email:req.body.useremail,
        password:req.body.userpassword
    })

    newUser
        .save()
        .then(user =>{
            // console.log(result)
            res.json({
                message:'saved data',
                userInfo:user
            })

        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })
})


// 로그인
router.post('/login',(req,res)=>{

})


module.exports = router
