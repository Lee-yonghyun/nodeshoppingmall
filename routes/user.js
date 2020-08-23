const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')

// 회원가입
router.post('/signup',(req,res)=>{


    bcrypt.hash(req.body.userpassword, 10 , (err,hash) => {

        if(err){
            return res.json({
                message:err.message
            })
        }
        else{
            const newUser = new userModel({
                name:req.body.username,
                email:req.body.useremail,
                password:hash
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
        }

    })



    // const newUser = new userModel({
    //     name:req.body.username,
    //     email:req.body.useremail,
    //     password:req.body.userpassword
    // })
    //
    // newUser
    //     .save()
    //     .then(user =>{
    //         // console.log(result)
    //         res.json({
    //             message:'saved data',
    //             userInfo:user
    //         })
    //
    //     })
    //     .catch(err=>{
    //         res.json({
    //             message:err.message
    //         })
    //     })
})


// 로그인
router.post('/login',(req,res)=>{

})


module.exports = router
