const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI-Spezifikation
    info: {
      title: 'Meine API',
      version: '1.0.0',
      description: 'Dokumentation meiner API mit Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Basis-URL der API
      },
    ],
  },
  apis: ['./routes/*.js'], // Pfad zu deinen API-Routen
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
