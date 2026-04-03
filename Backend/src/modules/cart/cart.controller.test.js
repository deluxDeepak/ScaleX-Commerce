// Unit test hi hota hai 
// Controller testing ==Unit testing 


// -- Service mock 
// -- test only controller logic 
const product = [
    {
        _id: "69c7c80c867870fc767abf05",
        title: "Men Product 1",
        description: "Test product description",
        features: [
            "Good",
            "Quality",
            "Best"
        ],
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
            "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"

        ],
        category: "69c7c80b867870fc767abe7f",
        subCategory: "69c7c80b867870fc767abe7f",
        sections: "topDiscounted",
        price: 3487,
        oldPrice: 6238,
        stock: 34,
        rating: 2,
        totalReviews: 3,
        seller: "69c7c80b867870fc767a",
        isActive: true,
        createdAt: "2026-03-28T12:22:36.132Z",
        updatedAt: "2026-03-28T12:22:36.132Z"

    }

]
jest.mock("./cart.service")

const { getCartItemsAll } = require("./cart.controller");
const { getItemAllService } = require("./cart.service");

describe("getCartItemsAll-Controller", () => {
    it("should return items", async () => {
        const mockData = product;

        getItemAllService.mockResolvedValue(mockData);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getCartItemsAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        // Pure response object se match karna hoga 
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockData,
            message: "Cart items fetched ."
        });
    });

    it("should handle error", async () => {
        getItemAllService.mockRejectedValue(new Error("DB Error"));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getCartItemsAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);

        // Pure response se match karna prega 
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "DB Error"
        });
    });


})

