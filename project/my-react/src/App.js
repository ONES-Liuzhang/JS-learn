import React from "react";

import StateSample from "./components/StateSample";
import CartSample from "./components/CartSample";
// import CartSample from "./components/CartSampleClass";
// import ZForm from "./components/ZForm";
import RcTrigger from "./components/RcTrigger";

function App() {
  return (
    <div className="App">
      <StateSample />
      <CartSample />
      <RcTrigger />
    </div>
  );
}

export default React.memo(App);
