const { MongoClient } = require('mongodb');

const mockDb = {
  collection: jest.fn().mockReturnThis(),
  find: jest.fn(),
  toArray: jest.fn(),
};

module.exports.getDb = jest.fn(() => mockDb);
