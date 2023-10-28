import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    age: { type: Number },
    interests: { type:Array },
    image: { type:String,required: true, default:"/images/1.jpeg"},
    bio: { type:String,required: true, default:"Just too smart for You"},
    university: { type:String },
    facebook: { type:String },
    whatsapp: { type:String },
    instagram: { type:String },
    snapchat: { type:String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isSuperAdmin: { type: Boolean, required: true, default: false },
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema,'users');
export default User;
