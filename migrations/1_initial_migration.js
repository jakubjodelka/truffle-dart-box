const AccessContract = artifacts.require("AccessContract");

module.exports = function (deployer) {
  deployer.deploy(AccessContract);
};
