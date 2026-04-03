/*
    ====Service mock + route real===========
    Without Mock (Tumhara current issue)
    -> DB slow → test fail ❌
    -> DB down → test fail ❌
    -> Network issue → test fail ❌
*/



const request = require("supertest");
const createApp = require("../../app");

// Mock service 
jest.mock("./cart.service");
const { getItemAllService } = require("./cart.service");

// create one app instance 
let app;
beforeAll(async () => {
    app = await createApp();
})


describe("Return cart-items", () => {

    it("GET /api/cart/cart-items should return cart items", async () => {
        getItemAllService.mockResolvedValue([{}]);

        const res = await request(app).get("/api/cart/cart-items");

        expect(res.statusCode).toBe(200);

        // What will expected from the response 
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("message");
    });


    it("should handle error", async () => {

        getItemAllService.mockRejectedValue(new Error("DB Error"));

        const res = await request(app).get("/api/cart/cart-items");

        expect(res.statusCode).toBe(500);
    });
});
