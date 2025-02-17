import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import Cat from './output-onlinegiftools.gif';

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  const sciFunc = {
};

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } 
    else if (expression == 0) {
      setResult(<img src={Cat} alt="ucat"/>);
    }
    else {
      setResult("An Error Occurred!");
    }
  }

  function handleButton(value) {
    //clear key
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } 
    //delete key
    else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } 
    // add, minus, multiply, divide key
    else if (sciFunc.hasOwnProperty(value)) {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + sciFunc[value]);
    } 
    // ! key
    else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } 

    else if (value === "=") calcResult(); 
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="calculator">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;
