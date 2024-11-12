import type { Config } from 'jest';
import { resolve } from 'node:path';

const jestConfig: Config = {
  bail: false,
  clearMocks: true,
  rootDir: resolve(__dirname),
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  coverageReporters: ['json-summary', 'text-summary', 'lcov', 'cobertura', 'clover'],
  testMatch: [],
  setupFilesAfterEnv: ['jest-extended/all', 'jest-chain'],
  globalSetup: null,
  globalTeardown: null,
  transform: {
    '^.+\\.[tj]s?$': 'babel-jest',
  },
};

export default jestConfig;
