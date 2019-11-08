'use strict';

const uuid = require('uuid/v4');
const User = require('./user')
module.exports = (sequalize,DataTypes) => {
    let BloodGroup = sequalize.define('BloodGroup',{
        bloodGroupID:{
            allowNull:false,
            primaryKey:true,
            type:DataTypes.STRING
        },
        bloodType:{
            allowNull:false,
            type:DataTypes.STRING
        },
        antigen:{
            allowNull:false,
            type:DataTypes.STRING
        },
        antibody:{
            allowNull:false,
            type:DataTypes.STRING
        }
        
    })

    //BloodGroup.hasMany(User,{foreignKey:'id'})

    BloodGroup.associate = function (models) {
        models.BloodGroup.hasMany(models.User);
      };

    return BloodGroup;
}