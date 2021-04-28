const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passortConfig = require('./passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const dotenv = require('dotenv');

// 모델 불러오기
const { sequelize } = require('./models');

// 라우트 불러오기
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts'); // 포스트 여러개 불러오는 라우터

dotenv.config();

// app 변수에 express 객체 담기
const app = express();

// 시퀄라이즈 실행
sequelize.sync({ force: false })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
})

// 패스포트 js 실행
passortConfig();

// 포트 설정
// app.set('port', 80);

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { // 세션 ID 쿠키에 대한 설정 (만료기한, 시간 등..)
        httpOnly: true,
        secure: false,
    },
}

if (process.env.NODE_ENV === 'production') { // 배포 시
    // 로깅 미들웨어
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    // 로깅 미들웨어
    app.use(morgan('dev'));
}

// CORS 처리를 위한 미들웨어
app.use(cors({
    origin: ['http://localhost:3000', 'slog.com', 'http://13.125.99.230'], // 브라우저에서 서버간 허용 주소
    credentials: true, // front, back 간 쿠키 전달 허용
}));

// path.join을 사용할 경우 OS 체제에 맞게 별도로 경로를 설정하지 않아도 된다
// 정적파일 제공 시 - express.static
// console.log('경로' ,path.join(__dirname), 'uploads');
app.use('/', express.static(path.join(__dirname, '/uploads')));
app.use('/', express.static(path.join(__dirname, '/uploads/thumb')));
// json - body 사용을 위한 미들웨어 (필수 장착)
app.use(express.json());
// urlencoded - form submit으로 전달받은 data를 사용하기 위한 미들웨어 (필수 장착)
app.use(express.urlencoded());

// header의 쿠키를 해석 및 req.cookies에서 확인할 수 있는 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
// session을 사용하기 위한 express 미들웨어
app.use(session(sessionOption));

// express 기반 애플리케이션에서 패스포트를 초기화하는 미들웨어
app.use(passport.initialize());
// 영구 로그인 세션을 사용하면 추가하는 미들웨어
app.use(passport.session());

// 라우터 설정
app.use('/user', userRouter); // /user
app.use('/auth', authRouter); // /auth
app.use('/post', postRouter); // /post
app.use('/posts', postsRouter); // /posts

app.get('/', (req, res) => {
    res.send('80 포트 연결!');
});

// 404 처리 미들웨어
app.use((req, res, next) => {
    console.log('404 에러');
    res.status(404).send('Not Found');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트애서 대기중');
// });

app.listen(80, () => {
    console.log('서버 실행 중!');
});