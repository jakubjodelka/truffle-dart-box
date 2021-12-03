import 'dart:io';

import 'package:http/http.dart';
import 'package:smart_contract_example/abi/AccessContract.g.dart';
import 'package:web3dart/web3dart.dart';

const rpcUrl = 'http://127.0.0.1:8545';

const contractAddress = 'deployed contract address';

const privateKeyOwner = 'owner private key';
const privateKeyClient = 'client private key';

void main() async {
  final web3Client = Web3Client(rpcUrl, Client());
  final accessControl = AccessContract(address: EthereumAddress.fromHex(contractAddress), client: web3Client);

  final owner = EthPrivateKey.fromHex(privateKeyOwner);
  final client = EthPrivateKey.fromHex(privateKeyClient);

  var ownerBalance = await web3Client.getBalance(owner.address);
  var clientBalance = await web3Client.getBalance(client.address);
  var userAccess = await accessControl.hasAccess(client.address);
  print('Owner balance before buy: $ownerBalance');
  print('User balance before buy: $clientBalance');
  print('User access before buy: $userAccess \n');

  final purchase = await accessControl.purchaseAccess(
    credentials: client,
    transaction: Transaction(
      value: EtherAmount.fromUnitAndValue(EtherUnit.ether, 1),
    ),
  );
  await web3Client.addedBlocks().take(100);

  ownerBalance = await web3Client.getBalance(owner.address);
  clientBalance = await web3Client.getBalance(client.address);
  userAccess = await accessControl.hasAccess(client.address);
  print('Purchase transaction hex: $purchase');
  print('User balance after buy: $clientBalance');
  print('User access after buy: $userAccess \n');

  final withdraw = await accessControl.withdrawBalance(credentials: owner);
  await web3Client.addedBlocks().take(100);

  ownerBalance = await web3Client.getBalance(owner.address);
  print('Withdraw transaction hex: $withdraw');
  print('Owner balance after buy: $ownerBalance');

  exit(0);
}
