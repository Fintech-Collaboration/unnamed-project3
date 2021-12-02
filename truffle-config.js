require("babel-register");
require("babel-polyfill");


module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8555,
      network_id: '*', // eslint-disable-line camelcase
    },
    ganache: {
      host: '127.0.0.1',
      port: 8454,
      network_id: '*', // eslint-disable-line camelcase
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  compilers: {
    solc: {
        version: "0.5.5",
    }
  }
};
