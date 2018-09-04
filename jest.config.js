const {defaults} = require('jest-config');

module.exports = {
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    },
    collectCoverage:true,
    coverageReporters: ["lcov", "text"],
    setupFiles:["./scr/test/TestSetup.js"]//,
    //reporters=["jest-junit"]
};