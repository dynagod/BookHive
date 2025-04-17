import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
});

userSchema.pre('save', async function( next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            role: this.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_SECRET_EXPIRY
        }
    );
};

export const User =  mongoose.model('User', userSchema);