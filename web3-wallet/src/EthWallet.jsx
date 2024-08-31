import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import {Wallet, HDNodeWallet} from "ethers";

export function EthWallet({mnemonic}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

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

        {addresses.map((a, idx) => <div style={{textAlign:'left'}}>
            Wallet {idx + 1} = {a} 
        </div>)}
    </div>
}