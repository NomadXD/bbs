'use strict';

const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
	let Donor = sequelize.define('Donor', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
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

    Donor.associate = function (models) {
        models.Donor.hasMany(models.DonationHistory);
      };

    return Donor;
}    