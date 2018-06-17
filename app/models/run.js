module.exports = function(sequelize, Sequelize) {
    var Run = sequelize.define('run', {
        number: { type: Sequelize.INTEGER },
        final: { type: Sequelize.BOOLEAN, defaultValue: false }
    });

    return Run;
}