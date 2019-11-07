/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const uuid = require('uuid/v4');
'use strict';
module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
		},
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(512),
			allowNull: false
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
    
	return User;
};
