const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../server.js');
const request = require('supertest');
const {initDb, closeDb} = require('../data/database')
const dotenv = require('dotenv').config()

describe('Test server, GET student and unknow route', () => {
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
    }, 10000); // Optional: increase timeout if Jest times out here

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        await closeDb();
    });

    test('GET students array', async () => {
        const response = await request(app).get('/student')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('first_name');
    });

    test('GET bad request', async () => {
        const response = await request(app).get('/unknown')
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Route not found');
    });
});
