//  ============= Mock data =============
// findItemAll() → DB call ❌ (real nahi call karna)
// logger → mock karna
// DatabaseError → check karna


/*
    // Mock
    jest.fn()
    mockResolvedValue()
    mockRejectedValue()

    // Assert
    toEqual()
    toBe()

    // Function check
    toHaveBeenCalled() sirf mock ya spy functions pe kaam karta hai
    toHaveBeenCalledWith()

    // Error
    rejects.toThrow()
*/
jest.mock("../../core/logger/logger", () => ({
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
}));
jest.mock("./cart.repository");

const logger = require("../../core/logger/logger");
const { DatabaseError, ValidationError } = require("../../shared/errors");
const { getItemAllService, getItemAllUserService } = require("../cart/cart.service");
const { findItemAll, findCartByUser } = require("./cart.repository");

// Mock the data ========
// logger and repository mocked above

describe("getItemAllService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Case 1 :- Data find ho gya 
    const mockData = [{}, {}];
    it("Should return items when exist", async () => {
        // 1.mock the data repo 
        findItemAll.mockResolvedValue(mockData);

        // Call service get result
        const result = await getItemAllService();

        // match the result with mock data 
        expect(result).toEqual(mockData);

        // Check if the respo called or not 
        expect(findItemAll).toHaveBeenCalled();

    })

    // Case 2: - Empty data mila
    it("should return empty array when data not found", async () => {
        findItemAll.mockResolvedValue([]);

        const result = await getItemAllService();

        expect(result).toEqual([]);
        // expect(logger.warn).toHaveBeenCalledWith("Cart is Empty");
        expect(logger.warn).toHaveBeenCalled();
    })
    // case 3: - Data nahi mila || Error aya  
    it("should throw databaseError when respository fails", async () => {
        findItemAll.mockRejectedValue(new Error("Error in fetching from the Databse"));

        await expect(getItemAllService()).rejects.toThrow(DatabaseError);

        expect(logger.error).toHaveBeenCalled();

    })
})

describe("getItemAllUserService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should throw error if userId is not provided", async () => {
        await expect(getItemAllUserService())
            .rejects
            .toThrow("Userid is not found")


    })

    it("should return cart of user", async () => {
        const mockData = [{}, {}];
        const userId = "1234";
        findCartByUser.mockResolvedValue(mockData);

        const result = await getItemAllUserService(userId);

        expect(result).toEqual(mockData);

        // 2.Argument check if argument pass or not 
        // findCartByUser call hua
        // Aur usme userId pass hua
        expect(findCartByUser).toHaveBeenCalledWith(userId)
    })

    it("should return empty array if cart is empty", async () => {
        findCartByUser.mockResolvedValue([]);

        const result = await getItemAllUserService("123");

        expect(result).toEqual([]);
        expect(logger.warn).toHaveBeenCalledWith("Cart is Empty");
    });

    it("should throw DatabaseError on failure", async () => {
        findCartByUser.mockRejectedValue(new Error("DB fail"));

        await expect(getItemAllUserService("123"))
            .rejects
            .toThrow("Error in fetching from the Databse");

        expect(logger.error).toHaveBeenCalled();
    });


})


