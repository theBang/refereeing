module.exports = function(sequelize, Sequelize) {
    var Try = sequelize.define('try', {
        number: { type: Sequelize.INTEGER }
    });

    return Try;
}