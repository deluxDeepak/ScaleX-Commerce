module.exports = {
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.js", "**/src/**/*.test.js", "**/*.spec.js"],

    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 75,
            functions: 80,
            lines: 80
        }
    }
}