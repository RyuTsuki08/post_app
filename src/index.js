//Index, archivo inicial del servidor 

//Requires
const Express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('./database.js');
const Router = require('./routes/app.routes');
const app = Express();


//Settings
app.set('port', 2112 || process.env.port);

//Middlewares
app.use(Express.static(path.join(__dirname, 'public')));
app.use('/img', Express.static(path.join(__dirname, 'public', 'img', 'uploads')))
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded())
app.use('/api', Router);


//Start server
app.listen(app.get('port'), () => console.log(`Starting server...`));
