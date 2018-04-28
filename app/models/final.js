module.exports = function(sequelize, Sequelize) {
    var Final = sequelize.define('final', {
        name: { type: Sequelize.STRING }
    });

    return Final;
}