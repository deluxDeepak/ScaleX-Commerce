/*
    Controller Testing Checklist
    - Express server start nahi hota
    - Actual route hit nahi hota
    - Fast hota hai

    1. Controller calls the correct service method
    2. Returns expected HTTP status code
    3. Returns correct response payload structure
    4. Handles errors properly with correct status codes
    5. Passes correct parameters to service
    6. Mocks all external dependencies properly


    

*/

const { getAllCategory } = require("./category.controller");

// Mock the service
jest.mock("./category.service");
const { getAllCategoryService } = require("./category.service");

describe("getAllCategory Controller", () => {
    let req, res;

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Mock res object with chainable methods
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Mock req object
        req = {};
    });

    it("should return all categories with status 200", async () => {
        const mockCategories = [
            {
                _id: "1",
                name: "Electronics",
                icon: "https://example.com/electronics.png"
            },
            {
                _id: "2",
                name: "Clothing",
                icon: "https://example.com/clothing.png"
            }
        ];

        // Mock the service to resolve with data
        getAllCategoryService.mockResolvedValue(mockCategories);

        // Call the controller
        await getAllCategory(req, res);

        // Assertions
        expect(getAllCategoryService).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            category: mockCategories,
            message: "Category feteched successfully"
        });
    });

    it("should return error with status 500 when service fails", async () => {
        const errorMessage = "Database connection failed";

        // Mock the service to reject with error
        getAllCategoryService.mockRejectedValue(new Error(errorMessage));

        // Call the controller
        await getAllCategory(req, res);

        // Assertions
        expect(getAllCategoryService).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: errorMessage
        });
    });

    it("should handle empty category list", async () => {
        const emptyCategories = [];

        // Mock the service to resolve with empty array
        getAllCategoryService.mockResolvedValue(emptyCategories);

        // Call the controller
        await getAllCategory(req, res);

        // Assertions
        expect(getAllCategoryService).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            category: emptyCategories,
            message: "Category feteched successfully"
        });
    });
});
