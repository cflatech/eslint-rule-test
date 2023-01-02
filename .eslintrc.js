module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "2022",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-local-rules"],
  rules: {
    "local-rules/no-process-node-env": "error",
    "local-rules/no-soft-private": "error",
  },
};
