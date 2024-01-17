const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation for your project',
      },
    },
    apis: ['./routes/*.js'], 
  };
  
  module.exports = options;
  