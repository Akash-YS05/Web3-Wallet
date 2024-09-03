import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import axios from "axios";

export function SolanaWallet({mnemonic}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [currentBalance, setCurrentBalance] = useState({});


    const checkBalance = async (address) => {
        try {
            const alchemy_url = 'https://solana-mainnet.g.alchemy.com/v2/CGikAm9Fk05kPDMVhvoRQ_LP6GIEtVj9';
            const body = {
                jsonrpc: '2.0',
                id: 1,
                method: 'getBalance',
                params: [address]
            };
            const response = await axios.post(alchemy_url, body);

            if (response.data.error) {
                console.error('Error fetching balance:', response.data.error);
                alert("ERROR OCCURED: " + response.data.error)
            } else {
                const balance = response.data.result.value;
                setCurrentBalance((prevBalance) => ({
                    ...prevBalance,
                    [address] : balance.toString()
                }))
            }



        } catch(e) {
            console.log("Error", e)
        }
    }


    return <div>
        <button onClick={function() {
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const deriveSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex+1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        }}>
            Add Solana Wallet
        </button>
        {publicKeys.map((p, idx) => <div key={idx} style={{textAlign:'left'}}>
            Wallet {idx + 1} - {p.toBase58()}
            <br />
            <button style={{backgroundColor: 'white', color: 'black', textDecoration: 'underline'}} onClick={() => {checkBalance(p)}}>
                Check Balance
            </button>
            <span>
                Current Balance = {currentBalance[p]}
            </span>
        </div>)}
    </div>
}