// remix.config.js
module.exports = {
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  serverBuildTarget: 'node-cjs',
  devServerPort: 8002,
  ignoredRouteFiles: ['**/.*'],
};
