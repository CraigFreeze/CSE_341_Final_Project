// database.test.js

const { initDb, getDb, closeDb } = require('../data/database.js');
console.log = jest.fn();
describe('Database Connection', () => {
    beforeAll(() => {
        console.log = jest.fn();
    });
    afterAll(async () => {
        await closeDb(); // Ensure database connection closes fully after all tests
        // console.log.mockRestore(); 
    });

    test('should initialize the database successfully', (done) => {
        initDb((err, db) => {
            expect(err).toBeNull();
            expect(db).toBeDefined();
            done();
            // closeDb;
        });
    });
});
