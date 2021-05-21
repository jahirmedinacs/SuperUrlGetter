// get dependencies

const https = require('https');
const express = require('express');
const fs = require("fs");

var Promise = require('any-promise/register');

const bodyParser = require('body-parser');

// const {key, cert} = await (async () => {
// 	const certdir = (await fs.readdir("/etc/letsencrypt/live"))[0];
// 	
// 	console.log(certdir);
// 
// 	return {
// 		key: await fs.readFile(`/etc/letsencrypt/live/${certdir}/privkey.pem`),
// 		cert: await fs.readFile(`/etc/letsencrypt/live/${certdir}/fullchain.pem`)
// 	}
// })();

const certname = "gscholarurls.drsavage.me";

const key = fs.readFileSync(`/etc/letsencrypt/live/${certname}/privkey.pem`);
const cert = fs.readFileSync(`/etc/letsencrypt/live/${certname}/fullchain.pem`);


const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./dailySales.routes.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "TheGSCholarApi"});
});

// listen on port 443

const httpsServer = https.createServer({key, cert}, app).listen(config.serverport)

// app.listen(config.serverport, () => {
//     console.log("Server is listening on port 36936");
// });
