module.exports = function(sequelize, Sequelize) {
    var TryResult = sequelize.define('try_result', {
        result: { type: Sequelize.INTEGER },
        position: { type: Sequelize.INTEGER }
    });

    return TryResult;
}