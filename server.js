const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid-v4');
const axios = require('axios');
const path = require('path');

// import Master into server
const Master = require('./master');
const master = new Master();

const app = express();

// apply middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// get a list of currencies
var currency_list;
axios.get('https://openexchangerates.org/api/currencies.json')
    .then((currencies) => {
        currency_list = currencies.data;
    }).catch((err) => {
        if (err) console.log(err);
    });

app.get('/api/ex/', (req, res) => {
    let input = {
        type: req.param('type', 'latest'),
        symbols: req.param('symbols', ''),
        date: req.param('date', ''),
    }
    let id = uuid();
    master.processReq(input, id).then((message) => {
        res.json(message);
    }).catch((err) => {
        res.sendStatus(500).send('Server Error');
    });
});

app.get('/api/currencylist', (req, res) => {
    res.json(currency_list);
});

//redirect all other route to the SPA
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.use(function (req, res, next) {
    res.sendFile(__dirname + "/frontend/build/index.html");
});

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// express server listening to port 8000
const port = 8000;

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});