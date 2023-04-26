const mongoose = require("mongoose");

const {MONGO_URL} = process.env;

const connect = ()=>{
    mongoose.connect(MONGO_URL ,{
        useNewUrlParser : true,
        useUnifiedTopology:true
    }).then( (conn)=>{
        console.log(`Connected to DB : ${conn.connection.host}`)
    }
    ).catch( error =>
        {
            console.log("DB connection failed")
            console.log(error.message);
            process.exit(1);
        })
}

module.exports = connect;