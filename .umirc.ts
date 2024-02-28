import { defineConfig } from '@umijs/max';

export default defineConfig({
  jsMinifier: 'terser',
  antd: {},
  access: {},
  model: {},
  dva: {},
  define: {
    API_ROOT: 'https://java.50d.top',
    // API_ROOT: 'http://localhost:9999',
    API_PREFIX: '/api',
    // API_PREFIX: '',
    GRAPHQL_PREFIX: '/graphql',
  },

  initialState: {},
  request: {},
  layout: {
    title: ' ',
  },

  routes: [
    {
      path: '/',
      component: './Home',
      layout: false
    },
    {
      path: '*',
      component: './404',
    },
  ],

  npmClient: 'yarn',
  tailwindcss: {},
});
