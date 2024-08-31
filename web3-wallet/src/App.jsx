import { useState } from "react";
import { generateMnemonic } from "bip39";

import "./App.css";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="container">
      <h1>Web3 Wallet</h1>
      <button onClick={async function() {
        const mn = generateMnemonic();
        setMnemonic(mn)
      }}>
        Generate Seed Phrase
      </button>
      <input type="text" value={mnemonic} />



      {mnemonic && <SolanaWallet mnemonic={mnemonic}/>}
      {mnemonic && <EthWallet mnemonic={mnemonic}/>}
    </div>
  );
}

export default App;
