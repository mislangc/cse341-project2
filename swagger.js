const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Documents Api',
        description: 'Documents Api'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)