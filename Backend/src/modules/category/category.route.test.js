
/*
    Route Testing Checklist
    - Express app run hota hai
    - Route middleware execute hota hai
    - Validation middleware execute hota hai
    - Controller call hota hai

    1. Route calls the correct service method
    2. Returns expected HTTP status code
    3. Returns correct response payload
    4. Handles errors properly
    5. Validates request data correctly (if data get POST )
    6. Handles unauthorized access correctly
    7. Mocks dependencies/services properly
*/

const request = require("supertest");
const createApp = require("../../app");

// Mock service 
jest.mock("./category.service");
const { getAllSUbCategoryService } = require("./category.service");

// Create one app instance 
let app;
beforeAll(async () => {
    app = await createApp();
})

afterEach(() => {
    jest.clearAllMocks();
});


// =============Write test ===============
// [getAllSubCategory] 
describe("GET /api/category/sub", () => {
    it("should return all subcategories", async () => {

        const mockData = [
            {
                _id: "1",
                name: "Mobiles",
                category: "Electronic"
            }
        ];

        // Call service here 
        getAllSUbCategoryService.mockResolvedValue(mockData)

        const res = await request(app).get("/api/category/sub");
        expect(res.statusCode).toBe(200);

        // Body having this property 
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("subCategory");

        // Equal to this mock data 
        expect(res.body.subCategory).toEqual(mockData);

        // Check if the service is call or not 
        expect(getAllSUbCategoryService).toHaveBeenCalled();

    })

    it("should handle error", async () => {

        getAllSUbCategoryService.mockRejectedValue(new Error("DB Error"));

        const res = await request(app).get("/api/category/sub");
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("success", false);
        expect(getAllSUbCategoryService).toHaveBeenCalled();

    });
})
