'use strict';

var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid user name. Must be between 1 and 99 characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be at least 8 characters.'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Invalid address name.'
        }
      }
    },
    address2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,50],
          msg: 'Invalid city name.'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,2],
          msg: 'Please select your state.'
        }
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      validate: {
        len: {
          args: [5,5],
          msg: 'Please input a valid zipcode.'
        }
      }
    },
    party: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,50],
          msg: 'Please select an option.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options) {
        if (pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    models.user.hasMany(models.ballot);
  };
  user.prototype.validPassword = function (passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };

  user.prototype.toJSON = function() {
    var userData = this.get();
    delete userData.password;
    return userData;
  }
  return user;
};
