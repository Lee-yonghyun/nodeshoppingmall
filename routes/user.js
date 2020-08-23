const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')

// 회원가입
router.post('/signup',(req,res)=>{

    // 이메일 중복 체크 => 패스워드 암호화 => 데이터베이스 저장
    userModel
        .findOne({email:req.body.useremail})
        .then(user =>{
            if(user){
                return res.json({
                    message:'already existed'
                })
            }
            else{
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
            }
        })
        .catch(err=>{
            res.json({
                message:err.message
            })
        })


    // bcrypt.hash(req.body.userpassword, 10 , (err,hash) => {
    //
    //     if(err){
    //         return res.json({
    //             message:err.message
    //         })
    //     }
    //     else{
    //         const newUser = new userModel({
    //             name:req.body.username,
    //             email:req.body.useremail,
    //             password:hash
    //         })
    //
    //         newUser
    //             .save()
    //             .then(user =>{
    //                 // console.log(result)
    //                 res.json({
    //                     message:'saved data',
    //                     userInfo:user
    //                 })
    //
    //             })
    //             .catch(err=>{
    //                 res.json({
    //                     message:err.message
    //                 })
    //             })
    //     }
    //
    // })

})


// 로그인
router.post('/login',(req,res)=>{

    //이메일 체크 => 패스워드 매칭(복구) => 유저 정보 뿌려주기
    userModel


})


module.exports = router
