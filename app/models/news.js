module.exports = function(sequelize, Sequelize) {
    var News = sequelize.define('news', {
        title: { type: Sequelize.STRING, allowNull: false },
        subtitle: { type: Sequelize.STRING, defaultValue: false },
        content: { type: Sequelize.STRING, defaultValue: false }/*,
        image: { type: Sequelize.STRING, defaultValue: false }*/
    });

    return News;
}