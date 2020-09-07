const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.users_signup_user = (req,res)=>{

    const {name, email, password} = req.body

    // 이메일 중복 체크 => 패스워드 암호화 => 데이터베이스 저장
    userModel
        .findOne({email})
        .then(user =>{
            if(user){
                return res.json({
                    message:'already existed'
                })
            }
            else{
                bcrypt.hash(password, 10 , (err,hash) => {

                    if(err){
                        return res.json({
                            message:err.message
                        })
                    }
                    else{
                        const newUser = new userModel({
                            name,
                            email,
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
};

exports.users_login_user = (req,res)=>{

    //이메일 유뮤 체크 => 패스워드 매칭(복구,디코딩) => 유저 정보 뿌려주기(대신 암호화해주어야 함), 자동로그인용!(브라우저나 모바일 기기에 저장할 수 있도록)
    //->암호화된 정보(토큰)

    const {name, email, password} = req.body
    // 이메일 유뮤 체크 => 패스워드 매칭(복구,디코딩) -> return jwt
    userModel
        .findOne({email})
        .then(user=>{
            if(!user){
                // 없다면?
                return res.json({
                    message:'your email wrong'
                })
            }
            else {
                // user가 등록되어 있다면?-> 비번을 매칭해서 풀어야지!
                bcrypt.compare(password, user.password, (err, result)=>{

                    if(err || result === false){
                        return res.json({
                            success: result, //result는 true or false
                            message:'password incorrect'
                        })
                    }
                    else{
                        const token = jwt.sign(
                            {email:user.email, userId:user._id},
                            "key",
                            {expiresIn:"1d"}
                        )

                        res.json({
                            success:result,
                            token:token
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
};