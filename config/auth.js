const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt =  require('bcryptjs');

module.exports = {
    signUser: function(user) {
        const token = jwt.sign(
          {
            Username: user.Username,
            UserId: user.UserId,
            Admin: user.Admin, // this was the update I did for lesson-handson-8 
          },
          'secret',
          {
            expiresIn: '1h'
          }
        );
        return token;
      },
  
      verifyUser: function(req, res, next) {
        try {
          let token = req.cookies.jwt;
          const decoded = jwt.verify(token, 'secret');
          req.userData = decoded;
          models.users
            .findOne({
              where: {
                UserId: decoded.UserId
              }
            })
            .then(user => {
              req.user = user;
              next();
            });
        } catch (err) {
          console.log(err);
          return res.status(401).json({
            message: 'Auth Failed'
          });
        }
      },

      hashPassword: function(plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
      }
    };





//this code is to be used for lesson 10

//     'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('users', {
//       UserId: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       FirstName: {
//         type: Sequelize.STRING
//       },
//       LastName: {
//         type: Sequelize.STRING
//       },
//       Email: {
//         type: Sequelize.STRING,
//         unique: true
//       },
//       Username: {
//         type: Sequelize.STRING,
//         unique: true
//       },
//       Password: {
//         type: Sequelize.STRING
//       },
//       Admin: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//       },
//       createdAt: {
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         type: Sequelize.DATE
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },

//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('users');
//   }
// };