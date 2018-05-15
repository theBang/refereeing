module.exports = function(sequelize, Sequelize) {
    var FinalProtocol = sequelize.define('final_protocol', {
        place: { type: Sequelize.INTEGER, allowNull: false }
    });

    return FinalProtocol;
}