export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      applicationName: process.env.APPLICATION_NAME || 'TBD',
      publicContactEmail: process.env.PUBLIC_CONTACT_EMAIL || 'm@f-a.nz',
      baseUrl: process.env.BASE_URL || 'http://localhost:1323',
    },
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    '/entries/**': { swr: true },
    // "/account/**": { ssr: false },
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer', '@tbd/common']
        : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone', '@tbd/common']
          : [],
    },
  },
})
