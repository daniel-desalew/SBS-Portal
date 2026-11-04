import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'SBS Portal API',
      version: '1.0.0',
    },
    servers: [{ url: '/api/v1' }],
  },
  apis: ['./src/modules/**/*.routes.ts'],
});