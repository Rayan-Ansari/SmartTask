import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom', // Simulates a browser environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to handle TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup file for additional configurations
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'], // Match test files
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
};

export default config;