'use strict';
module.exports = (sequelize, DataTypes) => {
  var ballot = sequelize.define('ballot', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    vote: DataTypes.STRING,
    sen1: DataTypes.STRING,
    sen1phone: DataTypes.STRING,
    sen2: DataTypes.STRING,
    sen2phone: DataTypes.STRING,
    rep: DataTypes.STRING,
    repphone: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  ballot.associate = function(models) {
    models.ballot.belongsTo(models.user);
  };
  return ballot;
};
