module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageReporters: ['json', 'json-summary', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Jest Report',
        outPath: './reports/jest-report.html',
      },
    ],
  ],
  rootDir: '.',
  testRegex: 'src/.*\\.test\\.js$',
  testResultsProcessor: '<rootDir>/node_modules/jest-junit-reporter',
};
