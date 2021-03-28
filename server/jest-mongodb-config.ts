export default {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.4.4', // Same version as on the Atlas hosting
      skipMD5: true,
    },
    autoStart: false,
  },
};
