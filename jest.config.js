module.exports = {
  roots: ["<rootDir>"],
  testMatch: [
    "<rootDir>/__tests__/**/*.spec.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  collectCoverage: true,
  //coveragePathIgnorePatterns: ["__tests__/file.ts"],
  coverageReporters: ["lcov", "html", "text"],
};
