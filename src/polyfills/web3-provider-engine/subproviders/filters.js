// Mock implementation of the filters subprovider
// This is a stub to prevent runtime errors

export default class FiltersSubprovider {
  constructor() {
    this.filters = {};
    this.filterIndex = 0;
  }

  // Basic filter methods to prevent errors
  newFilter() { return '0x0'; }
  getFilterChanges() { return []; }
  uninstallFilter() { return true; }

  // Handle the provider interface
  handleRequest(payload, next, end) {
    // Just pass through to the next provider
    next();
  }
}

// Also provide a named export
export const Filters = FiltersSubprovider;
