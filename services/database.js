const mongoose = require('mongoose')
const connectToDatabase = () =>{
    mongoose
        .connect(process.env.dbUri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(()=>{
            console.log("Connected to the database");
        })
        .catch((error)=> console.log(error));
}

module.exports = {
    connect: connectToDatabase
};