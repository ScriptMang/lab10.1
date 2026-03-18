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

  <div style={{ fontSize: "2em", textAlign: "center", margin: "20px 0" }}>
    Current Count: <span style={{ fontWeight: "bold" }}>{count}</span>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 10,
      marginBottom: 20,
    }}
  >

    <button  style={{ padding: "10px 15px" }} onClick={handleDecrement}>Decrement</button>
    <button   style={{ padding: "10px 15px" }} onClick={handleIncrement}>Increment</button>
    <button
      style={{
        padding: "10px 15px",
        backgroundColor: "#f44336",
        color: "white",
      }}
    >
      Reset
    </button>
  </div>

  <div style={{ marginBottom: 20, textAlign: "center" }}>
    <label htmlFor="stepInput">Step Value: </label>
    <input
      type="number"
      id="stepInput"
      min={1}
      style={{ padding: 8, width: 60 }}
      value={stepValue}
      onChange={(e) => setStepValue(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: 10, textAlign: "center", fontStyle: "italic" }}>
    Changes saved.
  </div>

  <div>
    <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: 5 }}>
      Count History:
    </h3>
    <ul
      style={{
        listStyleType: "none",
        paddingLeft: 0,
        maxHeight: 150,
        overflowY: "auto",
      }}
    >
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
