const express = require('express');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

// passport 로그인 - POST /auth/login
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // 3개 인자는 local에서 전달받는 인자
        if (err) { // 서버 에러
            console.error(err);
            return next(err); // 서버에러는 에러처리 미들웨어로 전달(app.js)
        }
        if (info) { // 클라이언트 에러 (계정 및 비밀번호 틀릴 경우)
            res.status(403).send(info.message); // local에서 message를 전달
        }
        // 위 에러 없이 로그인 진행 될 경우
        return req.logIn(user, async (loginErr) => {
            console.log('auth user', user)
            if (loginErr) { // passport.serialize에서 에러 시
                console.error(err);
                return next(err);
            }
            // passport.serialize에서 에러 없이 진행 될 경우
            const fullUser = await User.findOne({
                where: { id: user.id }, // user의 id를 찾아서
                attributes: {
                    exclude: ['password'], // 속성 중 password만 제외
                },
            });
            return res.status(200).json(fullUser);
        });
    })(req, res, next);
});

// 로그아웃 - GET /auth/logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send('로그아웃');
});


module.exports = router;