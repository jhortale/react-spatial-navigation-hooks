// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  setupFilesAfterEnv: [
    "<rootDir>/src/test/setupTest.ts"
  ]
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    verbose: true,
  };
};