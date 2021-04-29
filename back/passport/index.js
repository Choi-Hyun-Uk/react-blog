const passport = require('passport');
const local = require('./localStrategy');
const { User } = require('../models');

module.exports = () => {

    // 최초 로그인 성공 시
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 최초 로그인 성공 후 로그인 인증이 필요할 때마다 실행되며, id값으로 DB에서 정보를 가져온다
    passport.deserializeUser( async (id, done) => { // DB에서 정보를 찾으면 req.user로 넣어준다.
        try {
            const user = await User.findOne({ where: { id }});
            done(null, user); // done 시 callback , req.user로 로그인 사용자 확인 가능
        } catch(error) {
            console.error(error);
            done(error);
        }
    });

    local();
}
