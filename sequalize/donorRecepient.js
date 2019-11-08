'use strict';

const uuid = require('uuid/v4');
module.exports = (sequalize,DataTypes) => {
    let DonorRecepient = sequalize.define('DonationRecepient',{
        match_id: {
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
        match_status:{
            allowNull:false,
            type:DataTypes.INTEGER
        }
        
        
    })

    return DonorRecepient;
}