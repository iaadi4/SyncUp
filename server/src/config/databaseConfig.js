import mongoose from 'mongoose';
import config from './serverConfig.js';

const { DATABASE } = config;

const dbConnect = async () => {
    try {
        await mongoose.connect(DATABASE || 'mongodb://localhost:27017');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default dbConnect;