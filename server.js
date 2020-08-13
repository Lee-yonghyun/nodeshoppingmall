const express = require('express'); //express 설치한거 불러오기
const app =express(); // express 함수를 사용하도록 연결하기 (함수모음)

app.use((req,res)=> {
    res.json({
        message:'It works!'
    }); //DB에서 결국 json파일 형태로 파싱되어 옴.
})









const PORT = 5000; //재사용이 가능하게 상수화 , 포트를 설정해주기 들어가는 출입경로

app.listen(PORT, console.log('server staeted')); // 포트번호를 지정하기, 로그를 찍어준다. .>>호출, 서버가 만들어짐



