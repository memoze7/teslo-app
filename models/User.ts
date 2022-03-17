
import mongoose, { Schema, model, Model } from 'mongoose'
import { IUser } from '../interfaces'

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};



const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: [ 'admin', 'client' ],
      message: '{VALUE} no es un role valido',
      default: 'client',
      required: true
    }
  }
},
  opts
)

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User