module.exports = function(sequelize, Sequelize) {
    var Run = sequelize.define('run', {
        number: { type: Sequelize.INTEGER }
    });

    return Run;
}