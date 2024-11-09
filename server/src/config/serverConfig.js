import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    SECRETORKEY: process.env.SECRETORKEY,
    DATABASE: process.env.DATABASE
};