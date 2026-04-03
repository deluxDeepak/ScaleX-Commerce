const js = require("@eslint/js");
const globals = require("globals");
const jestPlugin = require("eslint-plugin-jest");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
    {
        ignores: ["node_modules/**", "coverage/**", "dist/**"],
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.node,
            sourceType: "commonjs",
        },
        ...js.configs.recommended,
    },
    {
        files: ["tests/**/*.js", "**/*.test.js", "**/*.spec.js"],
        plugins: {
            jest: jestPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            ...jestPlugin.configs["flat/recommended"].rules,
            "jest/prefer-expect-assertions": "off",
        },
    },
]);
