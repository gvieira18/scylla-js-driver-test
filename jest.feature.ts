import config from './jest.config';

config.testMatch?.push('<rootDir>/tests/feature/**/*.test.ts');
config.setupFilesAfterEnv?.push('<rootDir>/tests/config/globalHooks.ts');
config.globalSetup = '<rootDir>/tests/config/globalSetup.ts';
config.globalTeardown = '<rootDir>/tests/config/globalTeardown.ts';

export default config;
