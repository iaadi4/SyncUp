import express from 'express';
import config from './src/config/serverConfig.js';
import apiRoutes from './src/routes/index.js';
import dbConnect from './src/config/databaseConfig.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportAuth from './src/config/jwtConfig.js';

const app = express();

const { PORT } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log('Server started at', PORT);
    dbConnect();
    console.log('Mongo db connected');
});
