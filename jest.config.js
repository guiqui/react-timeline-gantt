const {defaults} = require('jest-config');

module.exports = {
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    },
    testPathIgnorePatterns:["/node_modules/","<rootDir>/scr/test/TestSetup.js"],
    modulePathIgnorePatterns:["./scr/test/TestSetup.js"],
    coverageDirectory: "./coverage/",
    collectCoverage:true,
    coverageReporters: ["lcov", "text"],
    setupFiles:["./src/test/TestSetup.js"]
};