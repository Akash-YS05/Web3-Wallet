import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import {Wallet, HDNodeWallet} from "ethers";
import axios from 'axios';


export function EthWallet({mnemonic}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [currentBalance, setCurrentBalance] = useState({});


    const checkBalance = async (address) => {
        try {
            const alchemy_url = 'https://eth-mainnet.g.alchemy.com/v2/CGikAm9Fk05kPDMVhvoRQ_LP6GIEtVj9';
            const body = {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_getBalance',
                params: [address, 'latest']
            };
            const response = await axios.post(alchemy_url, body);

            if (response.data.error) {
                console.error('Error fetching balance:', response.data.error);
                alert("ERROR OCCURED: " + response.data.error)
            } else {
                const balance = parseInt(response.data.result.toString(), 16).toString();
                setCurrentBalance((prevBalance) => ({
                    ...prevBalance,
                    [address] : balance
                }))
            }



        } catch(e) {
            console.log("Error", e)
        }
    }

    return <div>
        <button onClick={async function() {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const HDNode = HDNodeWallet.fromSeed(seed);
            const child = HDNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            setCurrentIndex(currentIndex+1);
            setAddresses([...addresses, wallet.address])
        }}>
            Add Ethereum Wallet
        </button>

        <div>
            {addresses.map((a, idx) => <div key={idx} style={{textAlign:'left'}}>

            Wallet {idx + 1} = {a} 
            <br />
            <button style={{backgroundColor: 'white', color: 'black', textDecoration: 'underline'}} onClick={() => {checkBalance(a)}}>Check Balance</button>
            <span>
                Current Balance = {currentBalance[a]}
            </span>

            </div>)}

            
        </div>
        
    </div>
}