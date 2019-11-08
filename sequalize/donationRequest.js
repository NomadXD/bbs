'use strict';

const uuid = require('uuid/v4');
module.exports = (sequalize,DataTypes) => {
    let DonationRequest = sequalize.define('DonationRequest',{
        donation_request_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
        },
        donor_id:{
            allowNull:false,
            type:DataTypes.UUID
        }
        
        
    })

    return DonationRequest;
}