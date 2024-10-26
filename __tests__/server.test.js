const request = require('supertest');
const app = require('../server.js');
const dbb = require('../data/database.js');

describe('Server and API Endpoints', () => {
    // beforeAll(async () => {
    //     dbb.initDb(); // Ensure database is initialized
    // });

    // afterAll(async () => {
    //     dbb.closeDb(); // Close database connection
    //     // app.close();  // Close server to free up the port
    // });

    test('should respond with 404 for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: "Route not found" });
    });
});
