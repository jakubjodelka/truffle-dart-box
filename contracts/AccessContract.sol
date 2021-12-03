// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AccessContract is AccessControl {
    bytes32 public constant ACCESS_ROLE = keccak256("ACCESS_ROLE");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function grantAccess(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ACCESS_ROLE, account);
    }

    function hasAccess(address account) public view returns (bool) {
        return hasRole(ACCESS_ROLE, account);
    }

    function withdrawBalance() public onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function purchaseAccess() public payable {
        require(
            msg.value >= 1 ether,
            "You must pay proper price for access"
        );
        _setupRole(ACCESS_ROLE, msg.sender);
    }
}
