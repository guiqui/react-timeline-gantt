module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "libs(.*)$": "<rootDir>/src/lib$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less)$": "identity-obj-proxy"
},
testPathIgnorePatterns:["/node_modules/", "dist/", "src/test/TestSetup.ts"],
modulePathIgnorePatterns:["/node_modules/","./src/test/TestSetup.ts"],
coverageDirectory: "./coverage/",
collectCoverage:true,
coverageReporters: ["lcov", "text"],
setupFiles:["./src/test/TestSetup.ts"]
};