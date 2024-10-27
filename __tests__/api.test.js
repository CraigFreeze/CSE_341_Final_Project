const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../server');
const request = require('supertest');
const {initDb} = require('../data/database')

describe('Test routes, GET -- student, class, teacher, grade, and unknow route', () => {
    let mongoServer;

    beforeEach(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongodbUrl = mongoServer.getUri();
        await mongoose.connect(mongodbUrl);
        await new Promise((resolve, reject) => {
            initDb((err) => {
            if (err) return reject(err);
                resolve();  
            });
        });
    }, 5000); // Optional: increase timeout if Jest times out here

    afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    });

    test('should retrieve all classes', async () => {
        const response = await request(app).get('/class');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve all grades', async () => {
        const response = await request(app).get('/grade');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve all students', async () => {
        const response = await request(app).get('/student');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve all teachers', async () => {
        const response = await request(app).get('/teacher');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve a grade by ID', async () => {
        const response = await request(app).get(`/grade/67099593204dafb2be0993d8`);
        expect(response.status).toBe(401);
        expect(response.body).toBe('You do not have access.Please Authenticate.');
    });
});
