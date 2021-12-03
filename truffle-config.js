const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

const GAS = 3000000;
const GASPRICE = 5;
const SKIP_DRY_RUN = false;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, "https://ropsten.infura.io/v3/" + process.env.INFURAKEY)
      },
      network_id: 3,
      gas: GAS,
      gasPrice: 1000000000 * GASPRICE,
      skipDryRun: SKIP_DRY_RUN
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, "https://kovan.infura.io/v3/" + process.env.INFURAKEY)
      },
      network_id: 42,
      gas: GAS,
      gasPrice: 1000000000 * GASPRICE,
      skipDryRun: SKIP_DRY_RUN
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, "https://rinkeby.infura.io/v3/" + process.env.INFURAKEY)
      },
      network_id: 4,
      gas: GAS,
      gasPrice: 1000000000 * GASPRICE,
      skipDryRun: SKIP_DRY_RUN
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, "https://goerli.infura.io/v3/" + process.env.INFURAKEY)
      },
      network_id: 5,
      gas: GAS,
      gasPrice: 1000000000 * GASPRICE,
      skipDryRun: SKIP_DRY_RUN
    },
    main: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, "https://mainnet.infura.io/v3/" + process.env.INFURAKEY)
      },
      network_id: 1,
      gas: GAS,
      gasPrice: 1000000000 * GASPRICE
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '666'
    },
    // Binance Smart Chain
    bsc: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, 'https://bsc-dataseed.binance.org/')
      },
      network_id: 56,
      kipDryRun: SKIP_DRY_RUN
    },
    bsc_test: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, 'https://data-seed-prebsc-1-s1.binance.org:8545/')
      },
      network_id: 97,
      kipDryRun: SKIP_DRY_RUN
    },
    // xDai
    xdai: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATEKEY, 'https://dai.poa.network')
      },
      network_id: 100,
      gas: GAS,
      gasPrice: 1000000000 * GASPRICE,
      kipDryRun: SKIP_DRY_RUN
    },
    // polygon (matic)
    matic: {
      provider: () => new HDWalletProvider(process.env.PRIVATEKEY, `https://rpc-mainnet.maticvigil.com/`),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mumbai: {
      provider: () => new HDWalletProvider(process.env.PRIVATEKEY, `https://rpc-mumbai.maticvigil.com/`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "pragma",
    }
  }
};