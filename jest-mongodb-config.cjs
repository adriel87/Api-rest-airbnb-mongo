module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '6.0.10',
        skipMD5: true,
      },
      instance: {
        dbName: 'test-apartment-db',
      },
      autoStart: false,
    },
  };
  