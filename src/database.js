const mongoose = require('mongoose');

const URI = 'mongodb+srv://RyuTsuki08:WJZxAVrxXt8sLhhX@cluster0.kuyt7.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI)
.then((db) => console.log(`DB is connected`))
.catch((err) => console.error(err));


module.exports = mongoose;