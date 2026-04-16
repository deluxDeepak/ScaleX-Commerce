const dotenv = require('dotenv')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || "test"
const envfile = `.env.${NODE_ENV}`

dotenv.config({ path: path.resolve(process.cwd(), envfile) });
const baseUrl = process.env.BASE_URL;

describe("Staging health check", () => {
    test("GET /api/health responds with 200", async () => {
        if (!baseUrl) {
            throw new Error("BASE_URL is not set");
        }

        const response = await fetch(`${baseUrl}/api/health`);

        expect(response.status).toBe(200);
    });
});