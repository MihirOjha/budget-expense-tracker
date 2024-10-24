const { createRequestHandler } = require('@remix-run/netlify');

module.exports = {
  serverBuildTarget: 'netlify',
  devServerPort: 8002,
  ignoredRouteFiles: ['**/.*'],
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
