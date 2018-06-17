module.exports = function(sequelize, Sequelize) {
    var RunResult = sequelize.define('run_result', {
        result: { type: Sequelize.DATE },
        track: { type: Sequelize.INTEGER },
        disqualification: { type: Sequelize.BOOLEAN }
    });

    return RunResult;
}