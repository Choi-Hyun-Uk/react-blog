## SNS형 블로그
>리액트로 제작한 SNS형 블로그 입니다. 자유로운 주제로 게시글을 작성하여 사람들과 소통하는 서비스입니다.  
포트폴리오용으로 제작한 개인 프로젝트입니다. 실제 서비스를 운영하기 위한 작업물은 아닙니다.

## 스택

### Front
- React JS
- Next JS
- Redux Toolkit
- Emotion
- Eslint / Prettier

### Back
- Node JS
- Express
>빌드한 자바스크립트를 실행시키기 위해 NodeJS를 사용하였고, NodeJS에서 웹 서버를 보다 쉽게 구축하기 위해 Express를 사용했습니다.
- Passport
>NodeJS의 미들웨어로서 사용자 인증을 구현하기 위해 사용했습니다.
- Sequlize
>NodeJS에서 MySQL에 저장된 데이터를 JS문법으로 제어할 수 있도록 도와주는 Sequelize ORM을 사용했습니다.
- Pm2
- MySQL

### AWS 배포
- EC2
>가상 컴퓨터 환경 인스턴스를 통해 서버를 구축 하였습니다.
- S3
>블로그에서 업로드되는 이미지 데이터를 저장하기 위해 S3를 사용했습니다.
- Lambda
>S3에서 이미지를 저장 시 리사이징 하기 위해 람다 함수를 사용했습니다.
- Route53
>EC2 인스턴스에서 받은 IP와 가비아에서 구매한 도메인을 연결시키기 위해(DNS-Domain Name System) 사용했습니다.
- Nginx
>http - 80번 포트, https - 443번 포트로 도메인 접근 시 지정해둔 도메인으로 리다이렉트 되도록 하였습니다.

## 구현 기능
- 회원가입 및 로그인 / 로그아웃
- 회원 프로필 이미지 업로드 및 프로필 수정
- 게시글 작성 , 수정 , 삭제 및 게시글 이미지 업로드
- 게시글 댓글 작성, 수정, 삭제

## 테스트 계정
ID - test01@gmail.com
PW - akdl1106
