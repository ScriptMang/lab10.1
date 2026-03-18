import { useState, useEffect, useMemo } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [stepValue, setStepValue] = useState(1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if( history[history.length-1] === count){
      return null
    } else {
      setHistory((prevHistory) => [...prevHistory, count]);
    }
  }, [count]);


  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("History", JSON.stringify(history));
    }, 500);
  
    return () => {
      clearTimeout(timer);
    }
  }, [history])

  console.log("history: ", history);


  const handleIncrement = () => {
    setCount((prev) => prev + +stepValue)
  }
  

  const handleDecrement = () => {
    setCount((prev) => prev - +stepValue)
  }
 
  
  return (
    <>
     <div className="stepCounterCard">
      <h2>Counter</h2>

  <div id="currCount">
    Current Count: <span>{count}</span>
  </div>

  <div className="stepCounterOptions">
    <button  className="buttonPadding" onClick={handleDecrement}>Decrement</button>
    <button  className="buttonPadding" onClick={handleIncrement}>Increment</button>
    <button  className="buttonPadding" id="resetCounter">Reset</button>
  </div>

  <div className="stepValueDisplay">
    <label htmlFor="stepInput">Step Value: </label>
    <input
      type="number"
      id="stepInput"
      min={1}
      value={stepValue}
      onChange={(e) => setStepValue(e.target.value)}
    />
  </div>

  <div id="saveStatus">
    Changes saved.
  </div>

  <div className="countHistory">
    <h3>
      Count History:
    </h3>
    <ul>
     {history.map((item, index) => (<li key= {index} style={{ padding: "3px 0px", borderBottom: "none" }}>{item}</li>))}
    </ul>
  </div>

  <small style={{ display: "block", textAlign: "center", marginTop: 20 }}>
    Use ArrowUp to increment and ArrowDown to decrement.
  </small>
</div>
    </>
  );
}

export default App;
