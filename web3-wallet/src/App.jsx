import { useState } from "react";
import { generateMnemonic } from "bip39";

import "./App.css";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <h1>- Web3 Wallet -</h1>
      <input type="text" value={mnemonic} />
      <button onClick={async function() {
        const mn = generateMnemonic();
        setMnemonic(mn)
      }}>Generate Seed Phrase</button>
    </>
  );
}

export default App;
