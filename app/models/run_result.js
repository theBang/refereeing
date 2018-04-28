module.exports = function(sequelize, Sequelize) {
    var RunResult = sequelize.define('run_result', {
        result: { type: Sequelize.DATE },
        track: { type: Sequelize.INTEGER }
    });

    return RunResult;
}