import React from "react";
import ReactDom from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import { ChainId,ThirdwebProvider } from "@thirdweb-dev/react";
import './input.css'
import App from "./App";



const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider desiredChainId = {ChainId.Sepolia}>
    
    <Router>
      <App />
    </Router>
  </ThirdwebProvider>
)