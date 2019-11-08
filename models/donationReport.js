'use strict';

const uuid = require('uuid/v4');
module.exports = (sequalize,DataTypes) => {
    let DonationReport = sequalize.define('DonationReport',{
        donation_report_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
        },
        report:{
            allowNull:true,
            type:DataTypes.TEXT
        }
        
        
    })

    return DonationReport;
}