import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import envVariables from '../config/serverConfig.js';
const { SECRETORKEY } = envVariables;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    image: {
        type: String
    }
}, {timestamps: true});

userSchema.pre('save', function(next) {
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJwt = function generate() {
    return jwt.sign({id: this.id, email: this.email}, SECRETORKEY, {expiresIn: '1w'});
}

const User = mongoose.model('User', userSchema);

export default User;