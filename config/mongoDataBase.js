const mongoose = require('mongoose');

mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo DB');
  })
  .catch((err) => {
    throw new Error(`Error to connect to mongo, ${err}`);
  });

module.exports = mongoose;
