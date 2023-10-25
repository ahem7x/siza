var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , app = express()
    , db = require('./db')
    , cors = require('cors')
    , path = require('path');

app.use(cors());
#app.use(require('./middleware/validateSession'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/devlite-app/dist/devlight-app'));

// v3 controllers
app.use('/api/v3', require('./controllers'));

// angular app
app.all('*', function (req, res) {
    res.status(200).sendFile(path.resolve('devlite-app/dist/devlight-app/index.html'));
});

db.initialize
    .then((data) => {
        app.listen(process.env.PORT || 9002, function () {
            console.log('app listening on port:', process.env.PORT || 9002);
        })
    })
    .catch((err) => {
        console.log('Initialization Failed:', err)
    });
