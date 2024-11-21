const {MongoClient} = require('mongodb');
const {initDb} = require('../data/database.js');

describe('Database test', function () {
  let connection;
  let db;

  beforeEach(async () => {
    connection = await MongoClient.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await new Promise((resolve, reject) => {
      initDb((err) => {
      if (err) return reject(err);
      resolve();
      });
  
  }, 5000); // Optional: increase timeout if Jest times out here

  });

  afterEach(async () => {
    await connection.close();
  });

  it('should get students', async () => {
    const users = connection.db().collection('student');
    const student = await users.find().toArray()
    expect(student).toBeInstanceOf(Array);
  });

});