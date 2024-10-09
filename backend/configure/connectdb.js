const mongoose = require('mongoose');

const connectdb = async () =>{
    try {
        const connect = await mongoose.connect('mongodb://0.0.0.0:27017/e-comercial-web');
        console.log(`connectde to mongodb database ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`error in mongodb ${error}`);
        
    }
}

module.exports = connectdb;