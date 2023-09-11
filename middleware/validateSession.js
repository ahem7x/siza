var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function (req, res, next) {
    console.log('validating session');
    let url = req.originalUrl;
    if (!url.startsWith('/api')) {
        next();
    }
    else if (url === '/api/v3/org/user/login' || url === '/api/v3/org') {
        // by pass
        next();
    } else {
        //console.log(req.headers.authorization);
        var token = req.headers.authorization;
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            req.query.userId = decoded.id;
            next();
        });
    }
} 