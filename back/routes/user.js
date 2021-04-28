const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { User, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const bcrypt = require('bcrypt');

const router = express.Router();

try {
    fs.accessSync('uploads/thumb'); // uploads 폴더 유무 체크
} catch (error) {
    console.log('uploads/thumb 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads/thumb'); // 없으면 생성
}

// 이미지 업로드 설정
const upload = multer({
    storage: multer.diskStorage({ // 하드디스크에 저장
        destination(req, file, done) {
            done(null, 'uploads/thumb'); // uploads 폴더에 저장
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 파일 확장자 추출
            const basename = path.basename(file.originalname, ext).normalize(); // 파일 이름 추출
            done(null, basename + '_' + new Date().getTime() + ext); // 이름 + 시간 + 확장자
        },
    }),
    limits: { filesize: 20 * 1024 * 1024 }, // 20MB 제한
});

// 회원가입 - POST /user/signup
router.post('/signup', async (req, res, next) => {
    try {
        const exEmail = await User.findOne({
            where: { email: req.body.email },
        });
        const exNickname = await User.findOne({
            where: { nickname: req.body.nickname },
        });
        if (exEmail) { // 이메일 검사 후 이메일이 기존에 있다면?
            return res.status(403).send('이미 사용중인 이메일입니다.');
        }
        if (exNickname) { // 이메일 검사 후 닉네임이 기존에 있다면?
            return res.status(403).send('이미 사용중인 닉네임입니다.');
        }
        // 비밀번호 해쉬화하기
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('회원가입을 축하드립니다!');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 로그인 상태 불러오기
// GET /user/loadUser
router.get('/loadUser', async (req, res, next) => {
    console.log('user', req.user);
    try {
        if (req.user) {
            const user = await User.findOne({
                where: { id: req.user.id } 
            });
            // id가 최대값인 image 가져오기
            const image = await Image.max('id', {
                where: { userId: user.id },
            });
            const fullUser = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [{
                    model: Image,
                    where: { id: image },
                }],
            });
            return res.status(200).json(fullUser);
        } else {
            console.log('로그인을 해주세요.');
            res.status(200).json(null);
        }
    } catch(error) {
        console.log('로그인 불러오기 에러발생!!!!');
        console.error(error);
        next(error);
    }
});

// PATCH - /user
// 닉네임 변경하기
router.patch('/', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// POST - /user/image
// 섬네일 업로드
router.post('/thumbnail', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
        });

        // 이미지 한 개 업로드 시 - image: '1.png'
        // DB Image에 생성
        const image = await Image.create({ src: req.body.image });
        await user.addImage(image); 

        const fullUser = await User.findOne({
            where: { id: user.id },
            attributes: { exclude: ['password'] },
            include: [{
                model: Image,
                where: { id: image.id },
            }],
        });

        res.status(200).json(fullUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST /user/image
// 이미지 업로드 - 로그인 확인 후 이미지 업로드 후 미들웨어 실행
router.post('/image', isLoggedIn, upload.single('image'), async (req, res, next) => {
    // req.files - array
    // req.file - single
    console.log(req.file);
    res.json(req.file.filename);
});

module.exports = router;