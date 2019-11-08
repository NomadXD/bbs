/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */
'use strict';

const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
		},
		first_name: {
			type:DataTypes.STRING,
			allowNull:false
		},
		last_name: {
			type:DataTypes.STRING,
			allowNull:false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		birthday:{
			type:DataTypes.DATE,
			allowNull:false
		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		gender:{
			type:DataTypes.STRING,
			allowNull:false
		},
		account_status:{
			type:DataTypes.INTEGER,
			allowNull:false
		},
		bloodGroupID:{
			allowNull:false,
            primaryKey:true,
            type:DataTypes.STRING
		}
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['email']
			}
		]
	});

	User.getUserByEmail = function(email){
		return this.findOne({where:{email}})
	}

	User.getUserById = function(id){
		return this.findOne({where:{id}})
	}

	User.associate = function (models) {
		models.User.belongsTo(models.User,{foreignKey:'bloodGroupID',constraints:true});
		//models.User.hasMany(models.DonationHistory,{foreignKey:'user_id',constraints:true})
	};

	
	  


    
	return User;
};
