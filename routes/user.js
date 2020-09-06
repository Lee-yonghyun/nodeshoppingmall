const express = require('express')
const router = express.Router()
const {
    users_signup_user,
    users_login_user
} = require('../controllers/users')


// 회원가입
router.post('/signup',users_signup_user)



// 로그인
router.post('/login',users_login_user)




module.exports = router
