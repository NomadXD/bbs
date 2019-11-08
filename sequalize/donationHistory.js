'use strict';

const uuid = require('uuid/v4');
module.exports = (sequalize,DataTypes) => {
    let DonationHistory = sequalize.define('DonationHistory',{
        donation_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
        },
        donor_id:{
            allowNull:false,
            type:DataTypes.UUID
        },
        recepient_id:{
            allowNull:false,
            type:DataTypes.UUID
        },
        donated_date:{
            allowNull:false,
            type:DataTypes.DATE
        },
        donation_report_id:{
            allowNull:true,
            type:DataTypes.UUID
        }
        
    })

    DonationHistory.associate = function (models) {
        models.DonationHistory.belongsTo(models.User);
        
    };
    DonationHistory.associate = function (models) {
      models.DonationHistory.belongsTo(models.Donor)
    };
    return DonationHistory;
}