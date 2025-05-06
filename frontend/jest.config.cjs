module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: [
      '<rootDir>/jest.setup.js'          
    ],
    setupFilesAfterEnv: [
      '@testing-library/jest-dom'         
    ],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
  };
  