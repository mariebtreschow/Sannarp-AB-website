const bcrypt = require('bcrypt');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Namn kan ej vara tom'
         }
      }
   },
    lastname: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Efternamn kan ej vara tom'
         }
      }
   },
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
         console.log('set function called on password attribute change, now adding password digest');
         this.setDataValue('passwordDigest', bcrypt.hashSync(val, 10))
      }
   },
   email: {
      type: DataTypes.STRING,
      validate: {
         notEmpty: {
            msg: 'Email kan ej vara tom'
         },
         isEmail: {
            msg: 'Måste vara i email form'
         },
      }
   },
   passwordDigest: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
