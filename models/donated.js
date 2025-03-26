const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const DonatedSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    lastDonatedDate: { type: Date, required: true },
    donationHistory: [
        {
            hospital: {
                type: Schema.Types.ObjectId, ref: 'users',
            },
            donatedDate: { type: Date, required: true }
        }
    ]
});

module.exports = mongoose.model('Donated', DonatedSchema);