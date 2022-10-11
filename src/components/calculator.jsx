import { useState, useEffect } from "react";

export default function Calculator() {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const operations = ["+", "-", "*", "/", "%", "()", "C"];
  const [currentNum, setCurrentNum] = useState("");
  const [prevNum, setPrevNum] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [history, setHistory] = useState("");

  useEffect(() => {
    if (selectedOperation) {
      return setHistory(`${prevNum} ${selectedOperation}`);
    }
  }, [selectedOperation, prevNum]);
  // Handle Button Press
  const pressed = (value) => {
    // condition for what each button should do

    if (value === "c") {
      setCurrentNum("");
      setHistory("")
      return;
    }

    // if its an equal sign, it should run the 'calculate' function.
    if (value === "=" || value === "Enter") {
      return calculate();
    }

    // check if the input value is contained in the operations array
    // if it does, continue to append
    if (operations.includes(value)) {
      return applyOperation(value);
    }

    if (numbers.includes(value)) {
      return appendNumber(value);
    }
  };

  // Add numbers to back of number
  const appendNumber = (value) => {
    if (selectedOperation) {
      setCurrentNum(value);
    } else {
      setCurrentNum((prevNum) => prevNum + value);
    }
  };

  // apply an operation inBetween numbers
  const applyOperation = (value) => {
    setPrevNum(currentNum);
    // setCurrentNum("")
    setSelectedOperation(value);
  };

  const calculate = () => {
    const operationMap = {
      "*": (a, b) => a * b,
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "%": (a, b) => a % b,
    };

    const operation = operationMap[selectedOperation];
    if (!operation) {
      alert(`Operation ${selectedOperation} is not yet supported 🙃`);
    }

    const result = operation(parseInt(prevNum), parseInt(currentNum));
    setPrevNum(result);
    setCurrentNum(result);
  };

  return (
    <section className="calculator-wrapper">
      <div className="input-container">
        <div className="cache">
          <h4 className="cache--text"> {history} </h4>
        </div>
        <input
          placeholder="0"
          onChange={(e) => setCurrentNum(e.target.value)}
          value={currentNum}
          defaultValue={currentNum}
          className="cal-input"
          type="disabled"
          name="calculator-number-input"
          id="calculator-input"
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

          <button onClick={() => pressed(".")}>.</button>
          <button onClick={() => pressed("0")}>0</button>
          <button onClick={() => pressed("000")}>000</button>
          <button onClick={() => pressed("=")}>&#61;</button>
        </div>
      </section>
    </section>
  );
}
