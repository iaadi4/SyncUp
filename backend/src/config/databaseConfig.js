import mongoose from 'mongoose';
import config from './serverConfig.js';

const { DATABASE } = config;

const dbConnect = async () => {
    await mongoose.connect(DATABASE);
}

export default dbConnect;