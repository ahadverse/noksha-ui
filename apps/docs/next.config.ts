import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Demo sources are read off disk while a page renders, so the tree has to
  // travel with the server bundle rather than being resolved from cwd.
  outputFileTracingIncludes: {
    '/docs/components/**': ['./src/demos/**/*'],
  },
  typedRoutes: true,
  // The documentation is the site. There is no separate marketing page to land
  // on, so `/` is not a route — it is a signpost to the real one.
  async redirects() {
    return [{ source: '/', destination: '/docs', permanent: false }];
  },
  // `/r` is a public API, not just static files: a CLI on someone else's
  // machine and a browser on someone else's origin both read it, so it needs
  // CORS. It only changes when a release does, hence the long shared cache with
  // revalidation rather than a short private one.
  async headers() {
    return [
      {
        source: '/r/:file*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default config;
