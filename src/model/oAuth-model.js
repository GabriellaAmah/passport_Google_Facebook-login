import mongoose from 'mongoose';
import {default as findOrCreate} from 'mongoose-findorcreate'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    facebook_id : {
        type : String
    },

    twitter_id : {
        type : String
    },

    google_id : {
        type : String
    },

    name: {
        type: String,
    },

}, { timestamps: true });

userSchema.plugin(findOrCreate)

const oAuthUser = mongoose.model('oAuth', userSchema);

export default oAuthUser

