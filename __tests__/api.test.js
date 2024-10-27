const request = require('supertest');
const app = require('../server.js');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { initDb } = require('../data/database');


let mongoServer;

beforeAll(async () => {
  // Initialize in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Set the MongoDB URI for testing
  process.env.DB_URI = uri;
  process.env.DB_NAME = 'testDb'; // Optional, if you specify DB_NAME

  // Connect mongoose to the in-memory MongoDB
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Initialize the database connection
  await new Promise((resolve, reject) => {
    initDb((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}, 10000); // Optional: increase timeout if Jest times out here

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /class', () => {
  test('should retrieve all classes', async () => {
    const response = await request(app).get('/class/');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /grade', () => {
  test('should retrieve all grades', async () => {
    const response = await request(app).get('/grade/');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /student', () => {
  test('should retrieve all students', async () => {
    const response = await request(app).get('/student/');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /teacher', () => {
  test('should retrieve all teachers', async () => {
    const response = await request(app).get('/teacher/');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});