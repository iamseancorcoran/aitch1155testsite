// Mock implementation of the fixture subprovider
// This is a stub to prevent runtime errors

export default class FixtureSubprovider {
  constructor(fixtures = {}) {
    this.fixtures = fixtures;
  }

  // Handle the provider interface
  handleRequest(payload, next, end) {
    // Just pass through to the next provider
    next();
  }
}

// Also provide a named export
export const Fixture = FixtureSubprovider;
