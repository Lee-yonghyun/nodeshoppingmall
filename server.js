const express = require('express'); //express 설치한거 불러오기
const app =express(); // express 함수를 사용하도록 연결하기

const PORT = 5000; //재사용이 가능하게 상수화 , 포트를 설정해주기 들어가는 출입경로

app.listen(PORT, console.log('server staeted')); // 포트번호를 지정하기, 로그를 찍어준다.