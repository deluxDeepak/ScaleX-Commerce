const request = require("supertest"); 

// runInBand--  sequence run karo all test 
// detectOpenHandles-- jo test run reha hai wo test show karo 

// ye ek asyn function hai app import kar reha hai to 
// - Supertest reuire real instance of the app 
// Test is define async always 
const createApp = require("../src/app");

// Express app instance.=========
describe("Health Api", () => {

    it("GET /api/health", async () => {
        const app = await createApp();
        const res = await request(app).get("/api/health");

        expect(res.statusCode).toBe(200);
    });

});