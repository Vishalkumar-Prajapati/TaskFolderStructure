const oEnv = {
  dev: {
    PORT: process.env.PORT || 3000,
  },
  stag: {
    PORT: process.env.PORT || 3300,
  },
  prod: {
    PORT: process.env.PORT || 3333,
  },
};
module.exports = oEnv[process.env.NODE_ENV || 'dev'];
