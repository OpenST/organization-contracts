module.exports = {
  networks: {
    development: {
      host: 'localhost',
      network_id: '*', // Match any network id
      port: 8545,
      gas: 8000000,
      gasPrice: 0x01,
    },
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          // set to same number of runs as openst-platform
          // so that integration tests on openst-protocol
          // give accurate gas measurements
          runs: 200,
        },
      },
    },
  },
};
