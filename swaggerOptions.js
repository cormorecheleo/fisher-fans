const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Fisher Fans',
        version: '1.0.0',
        description: 'API documentation',
      },
    },
    apis: ['./routes/*.js'], 
  };
  
  module.exports = options;
  