import express from 'express';
import config from './src/config/serverConfig.js';
import apiRoutes from './src/routes/index.js';
import dbConnect from './src/config/databaseConfig.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportAuth from './src/config/jwtConfig.js';
import cors from 'cors';
import {server, app } from './src/socket/socket.js';

const { PORT } = config;

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended:true}));
app.use(cors());

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);

server.listen(PORT, () => {
    console.log('Server started at', PORT);
    dbConnect();
    console.log('Mongo db connected');
});
