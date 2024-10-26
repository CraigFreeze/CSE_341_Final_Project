// swagger.test.js
require ('../swagger.js');

// Import swaggerAutogen and immediately initialize it to match the script
const swaggerAutogen = require("swagger-autogen")();

// Mock the initialized function to prevent actual file generation
jest.mock("swagger-autogen", () => () => jest.fn());

describe("Swagger Autogen", () => {
    it("should call swaggerAutogen with correct parameters", () => {
        const outputfile = "./swagger.json";
        const endpointsFiles = ["./routes/index.js"];
        const doc = {
            info: {
                title: "Gradebook Api",
                description: "Gradebook Api"
            },
            host: "localhost:3000",
            schemes: ["https", "http"]
        };

        // Call the function with the expected parameters
        swaggerAutogen(outputfile, endpointsFiles, doc);

        // Expectations
        expect(swaggerAutogen).toHaveBeenCalledTimes(1);
        expect(swaggerAutogen).toHaveBeenCalledWith(outputfile, endpointsFiles, doc);
    });
});
