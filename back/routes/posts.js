const express = require('express');
const { User, Post, Comment, Image } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// 게시글 불러오기 - GET /post
router.get('/', async (req, res, next) => {
    try {
        const where = {};
        // 초기 로딩 후 스크롤링 시 where 조회
        if (parseInt(req.query.last, 10) > 0) {
            // 마지막 포스트의 id값 보다 작은 포스트를 불러오기
            where.id = { [Op.lt]: parseInt(req.query.last, 10) };
        }

        // 최초 로드일 때는 order 순으로 9개를 불러온다.
        // 추후 스크롤링 시에는 마지막 id보다 작은 포스트를 order순으로 9개를 불러온다.
        const post = await Post.findAll({
            where,
            order: [
                ['createdAt', 'DESC'], // 기본값은 'ASC' 오름차순
            ],
            limit: 9,
            include: [{
                model: User, // 작성자
                attributes: ['id', 'nickname'],
                include: [{
                    model: Image, // 작성자 프로필 이미지
                    attributes: ['id', 'src'],
                    // separate : true,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                }],
            }, {
                model: Comment, // 댓글
                include: [{
                    model: User,
                    attributes: ['id'],
                }],
            }, {
                model: User, // 좋아요 누른사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Image, // 포스트 이미지
            }],
        });
        res.status(200).json(post);
    } catch(error) {
        console.log('여러 게시글 불러오기 에러 발생!!!');
        console.error(error);
        next(error);
    }
});

// 검색 게시물 불러오기 - GET /post
router.get('/:keyword', async (req, res, next) => {
    try {
        const like = decodeURIComponent(req.params.keyword);
        // 최초 로드일 때는 order 순으로 9개를 불러온다.
        // 추후 스크롤링 시에는 마지막 id보다 작은 포스트를 order순으로 9개를 불러온다.
        const post = await Post.findAll({
            where: {[Op.or]: [{
                content: {[Op.like]: `%${like}%`}
            }, {
                title: {[Op.like]: `%${like}%`}
            }]},
            order: [
                ['createdAt', 'DESC'], // 기본값은 'ASC' 오름차순
            ],
            include: [{
                model: User, // 작성자
                attributes: ['id', 'nickname'],
                include: [{
                    model: Image, // 작성자 프로필 이미지
                    attributes: ['id', 'src'],
                    // separate : true,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                }],
            }, {
                model: Comment, // 댓글
                include: [{
                    model: User,
                    attributes: ['id'],
                }],
            }, {
                model: User, // 좋아요 누른사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Image, // 포스트 이미지
                order: [['createdAt', 'ASC']],
            }],
        });
        res.status(200).json(post);
        // else if (post.length === 0) return res.status(200).send('검색 결과가 없습니다.');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;