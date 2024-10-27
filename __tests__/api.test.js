const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const classController = require('../controllers/classController');
const httpMocks = require('node-mocks-http');

describe('classController Integration Tests', () => {
    let mongoServer;
    let connection;
    let db;

    beforeAll(async () => {
        // Create an in-memory MongoDB instance
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        // Create a MongoDB connection
        connection = await MongoClient.connect(mongoUri);
        db = connection.db();

        // Mock the database.js getDb function
        jest.spyOn(require('../data/database'), 'getDb').mockReturnValue(db);
    });

    afterAll(async () => {
        // Clean up resources
        await connection.close();
        await mongoServer.stop();
    });

    describe('getAll', () => {
        let req;
        let res;

        beforeEach(async () => {
            // Create fresh request and response mocks
            req = httpMocks.createRequest();
            res = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });

            // Clear the collection before each test
            await db.collection('class').deleteMany({});
        });

        it('should return all classes with 200 status when classes exist', async () => {
            // Arrange: Insert test data
            const testClasses = [
                {
                    course_code: 'MATH101',
                    subject: 'Mathematics',
                    class_description: 'Calculus I',
                    max_class_size: 30
                },
                {
                    course_code: 'PHY201',
                    subject: 'Physics',
                    class_description: 'Mechanics',
                    max_class_size: 25
                }
            ];
            await db.collection('class').insertMany(testClasses);

            // Act: Call getAll
            const getAllHandler = classController.getAll();
            await getAllHandler(req, res);

            // Wait for the response to be complete
            await new Promise(resolve => res.once('end', resolve));

            // Assert
            expect(res.statusCode).toBe(200);
            const responseData = JSON.parse(res._getData());
            expect(responseData).toHaveLength(2);
            expect(responseData[0].course_code).toBe('MATH101');
            expect(responseData[1].course_code).toBe('PHY201');
        });

        it('should return 404 status when no classes exist', async () => {
            // Act: Call getAll with empty database
            const getAllHandler = classController.getAll();
            await getAllHandler(req, res);

            // Wait for the response to be complete
            await new Promise(resolve => res.once('end', resolve));

            // Assert
            expect(res.statusCode).toBe(404);
            const responseData = JSON.parse(res._getData());
            expect(responseData).toEqual({
                message: 'No classes found in the database'
            });
        });
    });
});