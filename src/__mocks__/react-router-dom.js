const React = require('react');

module.exports = {
  // Use jest.fn().mockReturnValue to ensure it always returns an object
  useLocation: jest.fn().mockReturnValue({
    pathname: '/',
  }),

  // Mock MemoryRouter just in case you use it in other tests
  MemoryRouter: ({ children }) => React.createElement('div', null, children),
};