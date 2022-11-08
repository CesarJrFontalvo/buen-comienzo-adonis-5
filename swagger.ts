const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'], // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)
