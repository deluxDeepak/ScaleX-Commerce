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
const {
    getItemAllService,
    getItemAllUserService
} = require("../cart/cart.service");


// Mock logger 
jest.mock("../../core/logger/logger", () => ({
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
}));
const logger = require("../../core/logger/logger");


// Mock the repository 
jest.mock("./cart.repository");
const {
    findItemAll,
    findCartByUser
} = require("./cart.repository");



// Use real error classes 
const { DatabaseError } = jest.requireActual("../../shared/errors");

describe("Cart Services", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("getItemAllService", () => {

        // Case 1 :- Data find ho gya 

        it("Should return items when exist", async () => {

            const mockData = [{}, {}];
            // 1.mock repository to return Items
            findItemAll.mockResolvedValue(mockData);

            // Call service get result
            const result = await getItemAllService();

            expect(findItemAll).toHaveBeenCalled();
            // match the result with mock data 
            expect(result).toEqual(mockData);
        })

        // Case 2: - Empty data mila
        it("should return empty array when Items not found", async () => {
            findItemAll.mockResolvedValue([]);

            const result = await getItemAllService();

            expect(findItemAll).toHaveBeenCalled();
            expect(result).toEqual([]);
            // expect(logger.warn).toHaveBeenCalledWith("Cart is Empty");
            expect(logger.warn).toHaveBeenCalled();
        })

        // case 3: - Data nahi mila || Error aya  
        it("should throw DatabaseError when repository fails", async () => {

            findItemAll.mockRejectedValue(
                new Error("Mongo connection failed")
            );

            await expect(getItemAllService())
                .rejects
                .toThrow(DatabaseError);

            await expect(getItemAllService())
                .rejects
                .toThrow("Error in fetching from the Databse");

            expect(logger.error).toHaveBeenCalledWith(
                expect.any(Object),
                "Error in fetching from the Databse"
            );
        });
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



})






