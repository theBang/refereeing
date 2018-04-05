module.exports = function(sequelize, Sequelize) {

    var City = sequelize.define('city', {
        name: { type: Sequelize.STRING, allowNull: false}
    });

    return City;
}