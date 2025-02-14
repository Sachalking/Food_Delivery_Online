const mongoose = require('mongoose');

// Replace with your own MongoDB URI if needed
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodpanda_clone';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    return mongoose.connection.db.collection('restaurants').insertMany([
      { name: "Pizza Place", cuisine: "Italian", rating: 4.5 },
      { name: "Sushi Bar", cuisine: "Japanese", rating: 4.7 }
    ]);
  })
  .then(result => {
    console.log('Data inserted:', result.insertedCount);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
