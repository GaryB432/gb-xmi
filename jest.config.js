module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/output/', '/packages/gb-xmi-cli/'],
  globals: {
    skipBabel: true
  }
};
