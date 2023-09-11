var mongoose = require('mongoose')
    ,config = require('./config');

let mongoDB = null;

module.exports.initialize = new Promise(
    function (resolve, reject) {
        // Mongo connection
        mongoose
            .connect(config.MONGODB_URI, { 
                useCreateIndex: true, 
                useFindAndModify: false,
                useNewUrlParser: true })
            .then(()=>{
                mongoDB = mongoose.connection
                resolve({})
            })
            .catch(err => {
                reject(err);
            });
    }
);