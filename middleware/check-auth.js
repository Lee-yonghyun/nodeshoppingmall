//미들웨어의 역할은? 발행된 jwt가 제대로 발행(변환)되었는지 안되었는지를 검증하는 코드

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1] //토큰을 헤더(html)에 담을 것이다.??
        const decoded = jwt.verify(token, "key") //토큰을 검증하는 코드(비교한다)
        req.userData = decoded
        next()
    }
    catch (error) {
        return res.json({
            message:'Auth failed',
            //인증실패
        })

    }
}