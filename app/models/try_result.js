module.exports = function(sequelize, Sequelize) {
    var TryResult = sequelize.define('try_result', {
        result: { type: Sequelize.FLOAT(5, 2) },
        position: { type: Sequelize.INTEGER },
        disqualification: { type: Sequelize.BOOLEAN }
    });

    return TryResult;
}