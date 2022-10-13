import { useState, useEffect } from "react";

export default function Calculator() {
  const [currentNum, setCurrentNum] = useState("");
  const [prevNum, setPrevNum] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [historyLog, setHistoryLog] = useState("");

  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "000",
  ];
  const operations = ["+", "-", "*", "/", "%", "()", "c"];

  // Make sure keyboard input is a number
  // that can allow only '.' and ',' with the operations
  const handleKeyPress = (e) => {
    const NUMBER_DOT_COMMA = /^[\d,.*+-/%c]*$/;
    const fieldValue = e.target.value;
    const fieldHasCommaOrDot =
      fieldValue.includes(".") || fieldValue.includes(",");
    const keyIsCommaOrDot = e.key === "." || e.key === ",";

    // console.log(e.key);
    if (e.key === "c") {
      clear();
      return;
    }

    if (e.key === "Enter") {
      calculate();
      return;
    }

    // Convert all Commas to dot
    if (
      !NUMBER_DOT_COMMA.test(e.key) ||
      (keyIsCommaOrDot && fieldHasCommaOrDot)
    )
      e.preventDefault();
    e.target.value = fieldValue.replace(",", ".");

    // Trigger the 'apply operation' function once the user inputs an operation
    if (operations.includes(e.key)) {
      applyOperation(e.key);
      return;
    }

    // e.preventDefault();
    // console.log(operations)
    // e.target.value = fieldValue.replace(",", ".");
  };

  const pressed = (value) => {
    if (value === "c") {
      return clear();
    }

    if (value === "=") {
      return calculate();
    }

    if (numbers.includes(value)) {
      // call the append Function
      return appendNumber(value);
    }

    if (operations.includes(value)) {
      return applyOperation(value);
    }
  };

  const clear = () => {
    setCurrentNum("");
    setPrevNum("");
    setHistoryLog("");
    setSelectedOperation("");
  };

  const appendNumber = (value) => {
    // Add the numbers to the back of the number
    setCurrentNum((prevCurrentNum) => prevCurrentNum + value);
    return;
  };

  // Watch changes for history
  // If there's a selected OP. set the History
  useEffect(
    (value) => {
      if (selectedOperation) {
        // since there's a selected operation now -
        // and the currentNum has moved to the prevNum -
        // set the current num to empty
        setCurrentNum("");
        // then set the history to the prevNum (which has the initial currentNum's value) and the selected op. sign
        setHistoryLog((prevHistoryLog) => `${prevNum} ${selectedOperation}`);
      }
    },
    [selectedOperation, prevNum]
  );

  const applyOperation = (value) => {
    // console.log(` You called ${value}`);
    setPrevNum(currentNum);
    // This is what tirggers the useEffect
    // Since the selected Op. is now 'true' or has a value
    setSelectedOperation(value);
  };

  // Handle Input Change
  // Watches every user input and sets it to the value of the input
  // Value is controle by button and keyboard.
  const handleChange = (e) => {
    e.preventDefault();
    setCurrentNum(e.target.value);
  };

  const calculate = () => {
    if (prevNum && selectedOperation && currentNum) {
      const operationMap = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "/": (a, b) => a / b,
        "*": (a, b) => a * b,
        "%": (a, b) => a % b,
      };

      const operations = operationMap[selectedOperation];

      if (!operations) {
        alert("That function isn't supported yet 🙃");
        return;
      }

      const result = operations(parseFloat(prevNum), parseFloat(currentNum));
      return setCurrentNum(result);
    } else {
      alert("Yikes, its an Invalid Operation😼");
    }
  };

//   const handleKeydown = (e) => {
//     handleKeyPress(e.key);
// }

// useEffect(() => window.addEventListener('keydown', handleKeydown)
// );

  // console.log(
  //   `Previous number is "${prevNum}" operation is "${selectedOperation}" and Current Number is "${currentNum}" also, Result is "coming here"`
  // );

  return (
    <section className="calculator-wrapper">
      <div className="input-container">
        <div className="cache">
          <h4 className="cache--text"> {historyLog} </h4>
        </div>
        <input
          placeholder="0"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={currentNum}
          className="cal-input"
          type="text"
          name="calculator-number-input"
          id="calculator-input"
          inputmode="decimal"
          // readonly="readonly"
          // autoFocus={true}
        />
      </div>
      

      <section className="calculator">
        <div className="buttons">
          <button onClick={() => pressed("c")}>C</button>
          <button onClick={() => pressed("()")}>( )</button>
          <button onClick={() => pressed("%")}>%</button>
          <button onClick={() => pressed("/")}>&#247;</button>

          <button onClick={() => pressed("1")}>1</button>
          <button onClick={() => pressed("2")}>2</button>
          <button onClick={() => pressed("3")}>3</button>
          <button onClick={() => pressed("*")}>&#0215;</button>

          <button onClick={() => pressed("4")}>4</button>
          <button onClick={() => pressed("5")}>5</button>
          <button onClick={() => pressed("6")}>6</button>
          <button onClick={() => pressed("+")}>&#43;</button>

          <button onClick={() => pressed("7")}>7</button>
          <button onClick={() => pressed("8")}>8</button>
          <button onClick={() => pressed("9")}>9</button>
          <button onClick={() => pressed("-")}>&#8722;</button>

          <button id="dot-button" onClick={() => pressed(".")}>.</button>
          <button onClick={() => pressed("0")}>0</button>
          <button onClick={() => pressed("000")}>000</button>
          <button onClick={() => pressed("=")}>&#61;</button>
        </div>
      </section>
    </section>
  );
}
