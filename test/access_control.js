const AccessContract = artifacts.require("AccessContract");

const { assert } = require('chai');
const keccak256 = require('keccak256')
const truffleAssert = require('truffle-assertions');
const { BN } = web3.utils

contract("AccessContract", function (accounts) {
  const owner = accounts[0]
  const ACCESS_ROLE = keccak256("ACCESS_ROLE");
  const ADMIN_ROLE = '0x00';

  before(async function () {
    const instance = await AccessContract.deployed();
    accounts.forEach(function (account) {
      instance.revokeRole(ACCESS_ROLE, account);
    });
    await instance.hasRole(ADMIN_ROLE, owner);
  });

  describe("create contract", async function () {

    it("creator has admin role", async function () {
      const instance = await AccessContract.deployed();
      const value = await instance.hasRole(ADMIN_ROLE, owner);

      return assert.isTrue(value);
    });

    it("random user has not admin role", async function () {
      const instance = await AccessContract.deployed();
      const value = await instance.hasRole(ADMIN_ROLE, accounts[1]);

      return assert.isFalse(value);
    });

  });

  describe("grant role", async function () {

    it("admin can grant access", async function () {
      const instance = await AccessContract.deployed();
      const oldRole = await instance.hasRole(ACCESS_ROLE, accounts[1]);
      assert.isFalse(oldRole)

      await instance.grantAccess(accounts[1]);
      const newRole = await instance.hasRole(ACCESS_ROLE, accounts[1]);

      return assert.isTrue(newRole);
    });

    it("random cannot grant the access", async function () {
      const instance = await AccessContract.deployed();
      const oldRole = await instance.hasRole(ACCESS_ROLE, accounts[2]);
      assert.isFalse(oldRole)

      await truffleAssert.reverts(instance.grantAccess(accounts[2], { from: accounts[1] }), " is missing role 0x00");
      const newRole = await instance.hasRole(ACCESS_ROLE, accounts[2]);

      return assert.isFalse(newRole);
    })


  });

  describe("has access", async function () {

    it("random do not has access", async function () {
      const instance = await AccessContract.deployed();

      const hasAccess = await instance.hasAccess(accounts[2]);

      return assert.isFalse(hasAccess);
    })

    it("user has access after grant access", async function () {
      const instance = await AccessContract.deployed();
      const oldRole = await instance.hasRole(ACCESS_ROLE, accounts[2]);
      assert.isFalse(oldRole)

      await instance.grantAccess(accounts[2]);
      const newRole = await instance.hasRole(ACCESS_ROLE, accounts[2]);

      return assert.isTrue(newRole);
    })
  });

  describe("purchase access", async function () {

    it("user can purchase access", async function () {
      const instance = await AccessContract.deployed();
      const oldContractBalance = await web3.eth.getBalance(instance.address);
      const oldRole = await instance.hasRole(ACCESS_ROLE, accounts[4]);
      assert.isFalse(oldRole)

      const priceInWei = web3.utils.toWei(new BN(1), 'ether');

      await instance.purchaseAccess({ from: accounts[4], value: priceInWei });

      const newRole = await instance.hasRole(ACCESS_ROLE, accounts[4]);
      const newContractBalance = await web3.eth.getBalance(instance.address);

      assert.isTrue(newRole);
      return assert.equal(new BN(newContractBalance).toWei, new BN(oldContractBalance).add(new BN(priceInWei)).toWei);
    })
  });

});
