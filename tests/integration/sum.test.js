const sum = require("./sum")

describe("Sum of two number", () => {
    test("should return 6 when adding 2 and 4", () => {
        const res = sum(2, 4);
        expect(res).toBe(6);
    })

    // Edge cases 
    test("should handle negative numbers", () => {
        expect(sum(-2, -3)).toBe(-5);
    });

    test("should handle zero", () => {
        expect(sum(0, 5)).toBe(5);
    });
})