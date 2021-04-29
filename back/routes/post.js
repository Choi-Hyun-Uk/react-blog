const express = require('express');
const path = require('path');
const fs = require('fs'); // 파일시스템 모듈
const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const { Op } = require('sequelize');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const router = express.Router();

try {
    fs.accessSync('uploads'); // uploads 폴더 유무 체크
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads'); // 없으면 생성
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

// 이미지 업로드 설정
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'react-blog-S3',
        key(req, file, cd) {
            cd(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
        },
    }),
    limits: { filesize: 20 * 1024 * 1024 }, // 20MB 제한
});

// S3 설정 전 DB 저장 방법(로컬)
// const upload = multer({
//     storage: multer.diskStorage({ // 하드디스크에 저장
//         destination(req, file, done) {
//             done(null, 'uploads'); // uploads 폴더에 저장
//         },
//         filename(req, file, done) {
//             const ext = path.extname(file.originalname); // 파일 확장자 추출
//             const basename = path.basename(file.originalname, ext).normalize(); // 파일 이름 추출
//             done(null, basename + '_' + new Date().getTime() + ext); // 이름 + 시간 + 확장자
//         },
//     }),
//     limits: { filesize: 20 * 1024 * 1024 }, // 20MB 제한
// });

// 게시글 작성 - POST /post
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            UserId: req.user.id // 로그인 성공 시 req.user에 정보가 있다 / 만들지 않았지만 관계 설정으로 생성된 컬럼
        });

        // 이미지 첨부 했을 시
        if (req.body.image) { 
            // Array.isArray - 배열 체크
            if (Array.isArray(req.body.image)) { // 이미지 여러 개 업로드 시 - image: ['1.png', '2.png']
                // create가 Promise기 때문에, Promise.all로 한번에 진행한다.
                // 이미지파일은 uploads에 저장을하고, DB에서는 경로만 저장을해서 불러온다.
                const images = await Promise.all(
                    req.body.image.map((image) => Image.create({ src: image }))
                );
                await post.addImages(images);
            } else { // 이미지 한 개 업로드 시 - image: '1.png'
                const image = await Image.create({ src: req.body.image});
                await post.addImages(image);
            }
        } 

        const fullPost = await Post.findOne({
            where: { id: post.id }, // 위에서 생성된 post의 id로 조건
            include: [{
                model: User, // 포스트 작성자
                attributes: ['id', 'nickname'], // 포스트 작성자 정보
                include: [{
                    model: Image,
                    attributes: ['id', 'src'],
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                }],
            }, {
                model: Comment,
                include: [{
                model: User, // 댓글 작성자
                attributes: ['id', 'nickname'], // 댓글 작성자 정보
                }],
            },{
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id', 'nickname'], // 좋아요 누른 사람 정보
            },{
                model: Image,
            }],
        });
        res.status(201).json(fullPost);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 게시글 삭제 - DELETE /post/1/
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({
            where: { id: req.params.postId },
        });
        res.status(200).json({ postId: parseInt(req.params.postId, 10) });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 게시글 수정하기 - PATCH /post
router.patch('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        // update 후 결과값은 배열에 업데이트가 되었는지 체크값이 들어있다.
        // 성공 - [1] , 실패 - [0]
        await Post.update({
            title: req.body.title,
            content: req.body.content,
        },
            {
                where: { id: req.body.postId },
            }
        );

        const post = await Post.findOne({ where: { id: req.body.postId } });

        if (req.body.image) { 
            // Array.isArray - 배열 체크
            if (Array.isArray(req.body.image)) { // 이미지 여러 개 업로드 시 - image: ['1.png', '2.png']
                // create가 Promise기 때문에, Promise.all로 한번에 진행한다.
                // 이미지파일은 uploads에 저장을하고, DB에서는 경로만 저장을해서 불러온다.
                const images = await Promise.all(
                    req.body.image.map((image) => Image.create({ src: image }))
                );
                await post.addImages(images);
            } else { // 이미지 한 개 업로드 시 - image: '1.png'
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }

        res.status(200).json({
            postId: req.body.postId,
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
        });
    } catch(error) {
        console.log('게시글 수정하기 에러발생!!!!');
        console.error(error);
        next(error);
    }
});

// 게시글 좋아요 추가하기 - PATCH /post/1/like
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.status(200).json({ postId: parseInt(req.params.postId, 10), UserId: req.user.id });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 게시글 좋아요 취소하기 - DELETE /post/1/like
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.status(200).json({ postId: parseInt(req.params.postId, 10), UserId: req.user.id });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 댓글 작성 - POST /post
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(400).send('게시글이 존재하지 않습니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: Post, // 작성된 게시글
                attributes: ['id'],
            }, {
                model: User, // 작성자
                attributes: ['id', 'nickname'],
                include: [{
                    model: Image,
                }],
            }]
        });
        res.status(201).json(fullComment);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 댓글 수정 - POST /patch
router.patch('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        })
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        const comment = await Comment.update({
            content: req.body.content,
        },
            {
                where: { id: req.body.commentId },
            }
        );
        if (!comment) {
            return res.status(403).send('댓글이 존재하지 않습니다.');
        }
        res.status(200).json({
            postId: parseInt(req.params.postId, 10),
            commentId: req.body.commentId,
            content: req.body.content,
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 댓글 삭제 - DELETE /post/1/comment/1/
router.delete('/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => {
    try {
        await Comment.destroy({
            where: { id: req.params.commentId },
        });
        res.status(200).json({
            commentId: parseInt(req.params.commentId, 10),
            postId: parseInt(req.params.postId, 10),
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 유저 게시글 페이지 불러오기 - GET /post/nickname
router.get('/:nickname', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { nickname: decodeURIComponent(req.params.nickname) },
        });
        if (!user) {
            return res.status(400).send('존재하지 않는 계정입니다.');
        }

        // 조건 기본값
        // const where = { UserId: user.id };

        // 초기 로딩 후 스크롤링 시 where 조회
        // if (parseInt(req.query.last, 10) > 0) {
        //     // 마지막 포스트의 id값 보다 작은 포스트를 불러오기
        //     where.id = { [Op.lt]: parseInt(req.query.last, 10) };
        // }
        
        // 프로필 이미지 - id가 최대값인 image 가져오기
        // const imageId = await Image.max('id', {
        //     where: { userId: user.id },
        // });

        // if (imageId) {
        //     const fullPost = await Post.findAll({
        //         where,
        //         order: [
        //             ['createdAt', 'DESC'], // 기본값은 'ASC' 오름차순
        //         ],
        //         limit: 5,
        //         include: [{
        //             model: User,
        //             attributes: ['id', 'nickname'],
        //             include: [{
        //                 model: Image,
        //                 where: { id: imageId },
        //             }],
        //         }, {
        //             model: Comment,
        //             attributes: ['id'],
        //         }, {
        //             model: User,
        //             as: 'Likers',
        //             attributes: ['id'],
        //         }, {
        //             model: Image,
        //             attributes: ['id', 'src'],
        //         }],
        //     });
        //     return res.status(200).json(fullPost);
        // }

        const post = await Post.findAll({
            where : { UserId: user.id },
            order: [
                ['createdAt', 'DESC'], // 기본값은 'ASC' 오름차순
            ],
            limit: 5,
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Comment,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Image,
                attributes: ['id', 'src'],
            }],
        });
        res.status(200).json(post);
    } catch(error) {
        console.log('나의 게시글 에러발생!!');
        console.error(error);
        next(error);
    }
});

// 게시글 하나만 불러오기 - GET /post/유저닉네임/포스트타이틀
router.get('/:nickname/:title', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { nickname: req.params.nickname },
        });
        if (!user) {
            return res.status(400).send('존재하지 않는 계정입니다.');
        }

        // 닉네임으로 유저의 포스트 모두 조회
        const posts = await Post.findAll({
            where: { UserId: user.id },
            attributes: ['title', 'id'],
        });

        // 조회한 포스트 모두 정규표현식으로 변환
        const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
        const a = posts.map((item) => {
            return {title: item.title.replace(regex, '-'), id: item.id}
        });
        const b = a.map((item) => {
            return {title: item.title.replace(/-$/, ''), id: item.id}
        });
        // 변환을 거친 포스트 제목과 req.params.title과 비교
        const find = b.filter((item) => item.title === req.params.title);

        // 비교해서 나온 결과물의 id로 DB 조회
        const post = await Post.findOne({
            where: { id: find[0].id },
            include: [{
                model: User, // 포스트 작성자
                attributes: ['id', 'nickname'],
                include: [{
                    model: Image, // 포스트 작성자 프로필 이미지
                    attributes: ['id', 'src'],
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                }],
            }, {
                model: Comment, // 댓글
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                    include: [{
                        model: Image, // 댓글 작성자 프로필 이미지
                        attributes: ['id', 'src'],
                        order: [['createdAt', 'DESC']],
                        limit: 1,
                    }],
                }],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Image, // 포스트 이미지
            }],
        });
        res.status(200).json(post);
    } catch(error) {
        console.log('게시글 불러오기 에러발생!!!!');
        console.error(error);
        next(error);
    }
});

// POST /post/images
// 이미지 업로드 - 로그인 확인 후 이미지 업로드 후 미들웨어 실행
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
    // 이미지가 업로드 되면, req.files에서 확인 가능
    // req.files - array
    // req.file - single
    console.log(req.files);
    // DB 로컬 저장 시 - res.json(req.files.map((v) => v.filename));
    res.json(req.files.map((v) => v.location));
});

// POST /post/image/1
// 이미지 삭제하기
router.delete('/image/:imageId', isLoggedIn, async (req, res, next) => {
    try {
        await Image.destroy({
            where: { id: req.params.imageId },
        });
        res.status(200).json({ imageId: parseInt(req.params.imageId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;