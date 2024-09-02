import mongoose from 'mongoose';

const dbConnect = async () => {
    await mongoose.connect('mongodb://localhost/chat_app');
}

export default dbConnect;