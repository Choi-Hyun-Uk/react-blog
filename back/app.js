const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const dotenv = require('dotenv');
const passortConfig = require('./passport');

dotenv.config();

// 라우트 불러오기
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts'); // 포스트 여러개 불러오는 라우터

// 모델 불러오기
const db = require('./models');

// app 변수에 express 객체 담기
const app = express();

// 시퀄라이즈 실행
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// 패스포트 js 실행
passortConfig();

// nginx로 proxy reverse로 인한 추가 코드
if (process.env.NODE_ENV === 'production') { // 배포 시
    console.log('배포 중');
    app.enable('trust proxy'); // true
    // 로깅 미들웨어
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
    // CORS 처리를 위한 미들웨어 - 배포용
    app.use(cors({
        origin: 'https://chudevlog.com', // 브라우저에서 서버간 허용 주소
        credentials: true, // front, back 간 쿠키 전달 허용
    }));
} else {
    // 로깅 미들웨어
    app.use(morgan('dev'));
    // CORS 처리를 위한 미들웨어 - 개발용
    app.use(cors({
        origin: true, // 브라우저에서 서버간 허용 주소
        credentials: true, // front, back 간 쿠키 전달 허용
    }));
}

// path.join을 사용할 경우 OS 체제에 맞게 별도로 경로를 설정하지 않아도 된다
// 정적파일 제공 시 - express.static
// console.log('경로' ,path.join(__dirname), 'uploads');
app.use('/', express.static(path.join(__dirname, '/uploads')));
app.use('/', express.static(path.join(__dirname, '/uploads/thumb')));
// json - body 사용을 위한 미들웨어 (필수 장착)
app.use(express.json());
// urlencoded - form submit으로 전달받은 data를 사용하기 위한 미들웨어 (필수 장착)
app.use(express.urlencoded({ extended: true }));

// header의 쿠키를 해석 및 req.cookies에서 확인할 수 있는 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
// session을 사용하기 위한 express 미들웨어
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  proxy: process.env.NODE_ENV === 'production',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' && '.chudevlog.com'
  },
}));

// express 기반 애플리케이션에서 패스포트를 초기화하는 미들웨어
app.use(passport.initialize());
// 영구 로그인 세션을 사용하면 추가하는 미들웨어
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('3065 포트 연결!');
});

// 라우터 설정
app.use('/user', userRouter); // /user
app.use('/auth', authRouter); // /auth
app.use('/post', postRouter); // /post
app.use('/posts', postsRouter); // /posts

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

app.listen(3065, () => {
    console.log('서버 실행 중!');
});