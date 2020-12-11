const { deployProxy  } = require('@openzeppelin/truffle-upgrades');

const BaseToken = artifacts.require('BaseToken');
const BaseTokenMonetaryPolicy = artifacts.require('BaseTokenMonetaryPolicy');
const BaseTokenOrchestrator = artifacts.require('BaseTokenOrchestrator');
const Cascade = artifacts.require('Cascade');
const Oracle = artifacts.require('Oracle');
const fake_address ="0x5ef493bBa5E24B74Fb0b471D0C9CeAf598a6eF80";
 

module.exports = async function (deployer) {
    const baseToken = await deployProxy(BaseToken, [ ], { deployer });
    console.log('BaseToken deployed to:', baseToken.address)
    const baseTokenMonetaryPolicy = await deployProxy(BaseTokenMonetaryPolicy, [ baseToken.address], { deployer });
    const baseTokenOrchestrator = await deployProxy(BaseTokenOrchestrator, [ baseTokenMonetaryPolicy.address], { deployer });
    const cascade = await deployProxy(Cascade, [ ], { deployer });
    const oracle = await deployProxy(Oracle, [ ], { deployer });
    await baseToken.setMonetaryPolicy(baseTokenMonetaryPolicy.address)
    await baseTokenMonetaryPolicy.setOrchestrator(baseTokenOrchestrator.address)
    await baseTokenMonetaryPolicy.setMcapOracle(oracle.address)
    await baseTokenMonetaryPolicy.setTokenPriceOracle(oracle.address) 
    await cascade.setLPToken(baseToken.address) 
    await cascade.setBASEToken(baseToken.address) 
}


 