const request = require('supertest');
const app = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { initDb, getDb } = require('../data/database');

let mongoServer;

beforeAll(async () => {
  // Initialize in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect mongoose to the in-memory MongoDB
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Initialize the database with mock URI
  await initDb((err) => {
    if (err) throw err;
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /class', () => {
  test('should retrieve all classes', async () => {
    const response = await request(app).get('/class');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /grade', () => {
  test('should retrieve all grades', async () => {
    const response = await request(app).get('/grade');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /grade/:id', () => {
  test('should retrieve a grade by ID', async () => {
    const response = await request(app).get(`/grade/67099593204dafb2be0993d8`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', gradeId.toString());
    expect(response.body).toHaveProperty('name', 'A');
    expect(response.body).toHaveProperty('score', 95);
  });
});

describe('GET /student', () => {
  test('should retrieve all students', async () => {
    const response = await request(app).get('/student');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /teacher', () => {
  test('should retrieve all teachers', async () => {
    const response = await request(app).get('/teacher');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});