const DataTypes = require('sequelize');
const { Model } = DataTypes; 

module.exports = class Image extends Model {
    static init(sequelize) {
        return super.init({
            src: {
                type: DataTypes.TEXT(),
                allowNull: false,
            },
            // belongsTo - UserId , PostId 임의로 생성
        },{
            sequelize,
            timestamps: true, // createAt, updateAt 자동 생성
            underscored: false, // sequelize에서 _ 사용할지 말지 ex) createAt -> create_at
            paranoid: true, // deleteAt을 생성 (삭제한 날짜)
            modelName: 'Image', // modelName - javascript에서 쓰인다.
            tableName: 'images', // tableName - SQL에서 쓰이며, modelName의 소문자로 하고, 복수형으로 짓는다.
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Image.belongsTo(db.User);
        db.Image.belongsTo(db.Post);
    }
};