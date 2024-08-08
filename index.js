require('dotenv').config()
const express = require('express');
const app = express();
const {router} = require('./Routes/index');
const {Connect_to_database} = require('./Database/index') 
const cors = require('cors');
app.use(express.json());
app.use(router);
app.use(cors({
    origin: function(origin,callback){
       return callback(null,true)
    },
    credentials: true,
    optionsSuccessStatus: 200
}))

Connect_to_database();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at the ${process.env.PORT}`);
})









