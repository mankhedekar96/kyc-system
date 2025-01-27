export default {
  projects: [
    '<rootDir>/client/jest.config.ts',
    '<rootDir>/server/jest.config.ts'
  ],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
