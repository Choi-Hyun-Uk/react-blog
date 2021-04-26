// 시퀄라이즈 가져오기
const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Image = require('./image');

// 개발모드
const env = process.env.NODE_ENV || 'development';

// 빈 DB 객체 생성
const db = {};

// 설정한 config 가져오고, 그 중 env 즉 개발용으로 진행
const config = require('../config/config')[env];

// 데이터베이스에 연결하기 위해서는 시퀄라이즈를 인스턴트화 진행 및 config 설정 넣기
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 생성된 DB 객체에 인스턴스 넣기
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Image = Image;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Image.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Image.associate(db);

module.exports = db;