var crypto = require('crypto'),
    algorithm = 'aes256',
    secret = 'uccs-report-api-key-1234';

exports.encrypt = function (plainText) {
    var cipher = crypto.createCipher(algorithm, secret)
    var crypted = cipher.update(plainText, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

exports.decrypt = function (encryptedText) {
    var decipher = crypto.createDecipher(algorithm, secret)
    var dec = decipher.update(encryptedText, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}