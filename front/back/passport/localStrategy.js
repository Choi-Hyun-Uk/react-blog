const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => { 
        // done은 3개의 인자를 넣을 수 있다
        // 첫번째: 서버에러시 / 두번째: 성공/실패 유무 / 세번째: 실패 시 응답 내용
        try {
            // 이메일 유무 체크
            const user = await User.findOne({
                where: { email }, // email: email을 줄일 수 있음 (키와 값이 동일할 경우에만)
            });
            if (!user) {
                // done으로 응답
                return done(null, false, { message: '이메일이 존재하지 않습니다.' });
            }
            // 비밀번호 비교 체크
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (passwordCheck) {
                return done(null, user);
            }
            return done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
        } catch(error) {
            console.error(error);
            return done(error);
        }
    }));
};
