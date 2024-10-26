// database.test.js

const { initDb, getDb, closeDb } = require('../data/database.js');

describe('Database Connection', () => {
    afterAll(async () => {
        await closeDb(); // Ensure database connection closes fully after all tests
    });

    test('should initialize the database successfully', (done) => {
        initDb((err, db) => {
            expect(err).toBeNull();
            expect(db).toBeDefined();
            done();
        });
    });

    // Additional tests can go here
});
