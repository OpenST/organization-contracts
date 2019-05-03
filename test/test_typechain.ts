import {Organization} from "../types/web3-contracts/Organization";

const ganache = require("ganache-cli");

import Web3 = require("web3");
import {join} from "path";
import {readFileSync} from "fs";

const GAS_LIMIT_STANDARD = 1000000;

let web3: Web3;
let accounts: string[];

async function createNewBlockchain() {
    const web3 = new Web3(ganache.provider());
    const accounts = await web3.eth.getAccounts();
    return {web3, accounts};
}

async function setup() {
    const r = await createNewBlockchain();
    web3 = r.web3;
    accounts = r.accounts;
    console.log("setup done");
};

export async function deployContract<T>(contractName: string): Promise<T> {
    const abiDirPath = join(__dirname, "../build/contracts");

    const artifact = JSON.parse(readFileSync(join(abiDirPath, contractName + ".json"), "utf-8"));

    const abi = artifact.abi;
    const code = artifact.bytecode;

    const Contract = new web3.eth.Contract(abi);
    const t = Contract.deploy({arguments: [
        accounts[0],
        accounts[0],
        [accounts[0]],
        1000
        ], data: code});


    return (await (t.send({
        from: accounts[0],
        gas: GAS_LIMIT_STANDARD,
    }) as any)) as T;
}

async function organizationContractTest() {

    await setup();

    const contract = (await deployContract("Organization")) as Organization;

    let adminAddress = await contract.methods.admin().call();
    let isWorker = await contract.methods.isWorker(accounts[0]).call();

    const receipt = await contract.methods.setAdmin(accounts[1]).send({from : accounts[0]});

    console.log("admin Address  ", adminAddress);
    console.log("isWorker  ", isWorker);
    console.log('receipt  ', receipt);
}


organizationContractTest();
