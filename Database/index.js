const mongoose = require('mongoose');

const Connect_to_database = async () => {
   await mongoose.connect('mongodb://localhost:27017/PracticeOfHackathon');

   mongoose.connection.on('connected', ()=> {
    console.log('Connected to MongoDB!');
   })

   mongoose.connection.on('error', () => {
    console.log(('Error connecting to MongoDB'));
   })
}
module.exports = {Connect_to_database}