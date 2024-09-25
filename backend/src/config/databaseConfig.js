import mongoose from 'mongoose';
import config from './serverConfig.js';

const { DATABASE } = config;

const dbConnect = async () => {
    await mongoose.connect(DATABASE || 'mongodb://localhost:27017');
}

export default dbConnect;