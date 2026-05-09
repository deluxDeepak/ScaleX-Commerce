/*
    Service Testing Checklist

    1. Service calls the correct repository method
    2. Handles data transformation correctly
    3. Validates input parameters
    4. Throws appropriate errors
    5. Mocks all external dependencies (repository, utilities)
    6. Returns expected data structure
*/

const {
    getAllCategoryService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
} = require("./category.service");

// Mock the repository
jest.mock("./category.repository");
const {
    findAllcategory,
    createCategory,
    deleteCategory,
    updateCategory,
} = require("./category.repository");

// Mock the utilities
jest.mock("../../shared/utils/genSlug");
const generateSlug = require("../../shared/utils/genSlug");

// Mock error classes

const { DatabaseError, NotfoundError, ValidationError } = jest.requireActual("../../shared/errors");

describe("Category Services", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Wroking 
    describe("getAllCategoryService", () => {
        it("should return all categories", async () => {
            const mockCategories = [
                {
                    _id: "1",
                    name: "Electronics",
                    slug: "electronics",
                },
                {
                    _id: "2",
                    name: "Clothing",
                    slug: "clothing",
                },
            ];

            // Mock repository to return categories
            findAllcategory.mockResolvedValue(mockCategories);

            // Call the service
            const result = await getAllCategoryService();

            // Assertions
            expect(findAllcategory).toHaveBeenCalled();
            expect(result).toEqual(mockCategories);
            expect(Array.isArray(result)).toBe(true);
        });

        it("should return empty array when no categories found", async () => {
            // Mock repository to return empty array
            findAllcategory.mockResolvedValue([]);

            // Call the service
            const result = await getAllCategoryService();

            // Assertions
            expect(findAllcategory).toHaveBeenCalled();
            expect(result).toEqual([]);
            expect(Array.isArray(result)).toBe(true);
        });

        it("should return empty array when repository returns non-array", async () => {
            // Mock repository to return non-array value
            findAllcategory.mockResolvedValue(null);

            // Call the service
            const result = await getAllCategoryService();

            // Assertions
            expect(findAllcategory).toHaveBeenCalled();
            expect(result).toEqual([]);
            expect(Array.isArray(result)).toBe(true);
        });
    });

    // Not working 
    describe("createCategoryService", () => {
        it("should create category with slug and return it", async () => {
            const inputData = {
                name: "Electronics",
                description: "Electronic items",
                subCategories: [
                    { name: "Mobiles" },
                    { name: "Laptops" },
                ],
            };

            const mockCreatedCategory = {
                _id: "123",
                ...inputData,
                slug: "electronics",
                subCategories: [
                    { name: "Mobiles", slug: "mobiles" },
                    { name: "Laptops", slug: "laptops" },
                ],
            };

            // Mock utilities
            generateSlug.mockImplementation((name) => name.toLowerCase());

            // Mock repository
            createCategory.mockResolvedValue(mockCreatedCategory);

            // Call the service
            const result = await createCategoryService(inputData);

            // Assertions
            expect(generateSlug).toHaveBeenCalledWith("Electronics");
            expect(createCategory).toHaveBeenCalled();
            expect(result).toEqual(mockCreatedCategory);
            expect(result.slug).toBe("electronics");
        });

        it("should throw ValidationError if name is not provided", async () => {
            const inputData = {
                description: "No name provided",
            };

            // Should throw before calling repository
            await expect(createCategoryService(inputData)).rejects.toThrow(ValidationError);

            // Repository should not be called
            expect(createCategory).not.toHaveBeenCalled();
        });

        it("should throw DatabaseError if category creation fails", async () => {
            const inputData = {
                name: "Electronics",
                subCategories: [],
            };

            generateSlug.mockImplementation((name) => name.toLowerCase());
            createCategory.mockResolvedValue(null);

            // Should throw DatabaseError
            await expect(createCategoryService(inputData)).rejects.toThrow(DatabaseError);

            expect(createCategory).toHaveBeenCalled();
        });
    });

    // Not working 
    describe("deleteCategoryService", () => {
        it("should delete category and return it", async () => {
            const catId = "123";
            const mockDeletedCategory = {
                _id: catId,
                name: "Electronics",
            };

            deleteCategory.mockResolvedValue(mockDeletedCategory);

            // Call the service
            const result = await deleteCategoryService(catId);

            // Assertions
            expect(deleteCategory).toHaveBeenCalledWith(catId);
            expect(result).toEqual(mockDeletedCategory);
        });

        it("should throw ValidationError if catId is not provided", async () => {
            // Should throw without calling repository
            await expect(deleteCategoryService(null)).rejects.toThrow(ValidationError);

            expect(deleteCategory).not.toHaveBeenCalled();
        });

        it("should throw NotfoundError if category does not exist", async () => {
            const catId = "123";

            deleteCategory.mockResolvedValue(null);

            // Should throw NotfoundError
            await expect(deleteCategoryService(catId)).rejects.toThrow(NotfoundError);

            expect(deleteCategory).toHaveBeenCalled();
        });
    });

    // Not working 
    describe("updateCategoryService", () => {
        it("should update category and return updated data", async () => {
            const catId = "123";
            const updateData = { name: "Updated Electronics" };
            const mockUpdatedCategory = {
                _id: catId,
                ...updateData,
            };

            updateCategory.mockResolvedValue(mockUpdatedCategory);

            // Call the service
            const result = await updateCategoryService(catId, updateData);

            // Assertions
            expect(updateCategory).toHaveBeenCalledWith(catId, updateData);
            expect(result).toEqual(mockUpdatedCategory);
        });

        it("should throw ValidationError if catId is not provided", async () => {
            const updateData = { name: "Updated" };

            // Should throw without calling repository
            await expect(updateCategoryService(null, updateData)).rejects.toThrow(ValidationError);

            expect(updateCategory).not.toHaveBeenCalled();
        });

        it("should throw ValidationError if data is not provided", async () => {
            const catId = "123";

            // Should throw without calling repository
            await expect(updateCategoryService(catId, null)).rejects.toThrow(ValidationError);

            expect(updateCategory).not.toHaveBeenCalled();
        });

        it("should throw NotfoundError if category does not exist", async () => {
            const catId = "123";
            const updateData = { name: "Updated" };

            updateCategory.mockResolvedValue(null);

            // Should throw NotfoundError
            await expect(updateCategoryService(catId, updateData)).rejects.toThrow(NotfoundError);

            expect(updateCategory).toHaveBeenCalled();
        });
    });
});
