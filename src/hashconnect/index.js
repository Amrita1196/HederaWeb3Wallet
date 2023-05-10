// const {
//     TokenAssociateTransaction,
//     TokenCreateTransaction,
//     Client,
//     TokenType,
//     TokenMintTransaction,
//     AccountBalanceQuery, PrivateKey, Wallet, TokenSupplyType
// } = require("@hashgraph/sdk");
//require('dotenv').config();
import { HashConnect } from "hashconnect";
import axios from 'axios';

let hashconnect = new HashConnect(true) //enable true for debug mode

let appMetadata = {
    name: 'dApp Example',
    description: 'An example hedera app',
    icon: 'https://absolute.url/to/icon.png'
}

export const pairHashpack = async () => {
    let initData =  hashconnect.init(appMetadata, "testnet", true);
    console.warn(initData); 

    hashconnect.foundExtensionEvent.once((walletMetadata)=>{
        console.log(walletMetadata);
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
    })

   

    hashconnect.pairingEvent.once((pairingData)=> {

        const accountId = pairingData.accountIds[0];
        axios.post('https://642eb37c8ca0fe3352d67f24.mockapi.io/greenarmy', {accountId})
        .then((response)=> {
            console.log(response.data);
        }).catch((error)=>{
            console.error(error);
        })   

        console.log("Hii Amrita there",pairingData.accountIds[0])

    })
    return initData
}



//  //Associate a token to an account and freeze the unsigned transaction for signing
//  async function tokenAssociate(){
//     const x =  pairHashpack();
//     const _accountId = initData.accountIds[0];
//     const _provider = hashConnect.getProvider(netWork, pairingData.topic, _accountId);

//     const _signer = hashConnect.getSigner(_provider)
//     const  Token_ID =process.env.TOKEN_ID;
//     const allowanceTx =  new TokenAssociateTransaction()
//    .setAccountId(_accountId)
//    .setTokenIds([TokenId.fromString(Token_ID)]);
   
//     if (!allowanceTx) return false;
   
//     const allowanceFreeze =  allowanceTx.freezeWithSigner(_signer);
   
//     if (!allowanceFreeze) return false;
   
//     const allowanceSign =  allowanceFreeze.signWithSigner(_signer);
   
//     if (!allowanceSign) return false;
   
//     const allowanceSubmit =  allowanceSign.executeWithSigner(_signer);

//     if (!allowanceSubmit) return false;
   
//     const allowanceRx =  _provider.getTransactionReceipt(allowanceSubmit.transactionId);
//     console.log(`token association status ${allowanceRx.status}`);
//     if (allowanceRx.status._code === 22)
   
//         return true;
   
//     return false;
   
    
//     }