import { click } from "@testing-library/user-event/dist/click";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const loginTime = Date.now();

  const [ans, setAns] = useState();
  const [total, setTotal] = useState(0);
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [result, setResult] = useState(`PRESS 'CHECK' `);
  const [timeArray, setTimeArray] = useState([0]); //-------------timeArray
  const [guessesArray, setGuessesArray] = useState([0]); //-----------guessesArray
  const [symbol, setSymbol] = useState([`🟢`]);
  const [randNo, setRandNo] = useState(Math.trunc(Math.random() * 20 + 1));
  console.log(randNo);
  //   ✅✔❎❌✔🟢🔴🟥🟩✅🔺🔻

  // guesses list -------------->
  const guessesList = guessesArray.map((guesses) => (
    <li key={guesses.toString()}>{guesses}</li>
  ));
  // time list ---------------->
  const timeList = timeArray
    .slice(1, timeArray.length)
    .map((millis) => <li key={millis.toString()}>{millis}</li>);
  // symbol list---------------->
  const symbolList = symbol
    .slice(1, timeArray.length)
    .map((sym) => <li key={sym.toString()}>{sym}</li>);
  // checkTheNumber()------------------------------------------------------
  const checkTheNumber = () => {
    setTotal(total + 1);
    setGuessesArray((oldArray) => [
      ...oldArray.slice(0, guessesArray.length - 1),
      oldArray[oldArray.length - 1] + 1,
    ]);
    if (!ans) {
      setResult("Enter a number , PLEASE!!");
    } else if (ans == randNo) {
      setWins(wins + 1);
      setAns("");
      setResult(`YOU WIN 🥳`);
      restart();
      setSymbol((oldArray) => [...oldArray, "🟢"]);
    } else if (ans > randNo) {
      setResult(`TOO HIGH 💥`);
    } else {
      setResult(`TOO LOW 💥`);
    }
  };

  //   clearTheField()--------------
  const clearTheField = () => {
    setAns("");
    console.log(guessesArray);
  };

  //   restart()----------------
  const restart = () => {
    setAns("");
    if (ans != randNo) {
      setLoses(loses + 1);
      setSymbol((oldArray) => [...oldArray, "🔴"]);
      // setSymbol("🔴");
    }
    setGuessesArray((oldArray) => [...oldArray, 0]);
    const timeTaken = Math.floor(
      (Date.now() - timeArray[timeArray.length - 1] - loginTime) / 1000
    );
    setTimeArray((oldArray) => [...oldArray, timeTaken]);
    setRandNo(Math.trunc(Math.random() * 20 + 1));
  };
  // handleGuessedNumber-------------------
  const handleGuessedNumber = (e) => {
    e.preventDefault();
    setAns(e.target.value);
  };
  // handle key pressed -----------------------
  const handleKeyPressed = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      checkTheNumber();
    }
  };
  // -------------------------------------------
  return (
    <div className="mainContainer">
      <div className="nameOfTheGame">
        <h1>A GUESSING GAME</h1>
      </div>

      <div className="timeKeeper">
        <div className="timeKeeperName">
          <h2>TIME KEEPER</h2>
        </div>
        <section className="timeKeeperSection">
          <span className="trials-heading">
            <h3>GUESSES</h3>
          </span>
          <div className="trials">
            <ul style={{ "list-style": "none", color: "white" }}>
              {guessesList}
            </ul>
          </div>
          <span className="time-heading">
            <h3>TIME</h3>
          </span>
          <div className="time">
            <ul style={{ "list-style": "none", color: "white" }}>{timeList}</ul>
          </div>
          <span className="symbol-heading">{/* <h3>🟢/🔴</h3> */}</span>
          <div className="symbol">
            <ul style={{ "list-style": "none" }}>{symbolList}</ul>
          </div>
        </section>
      </div>

      <div className="gameLogic">
        <h2>GAME LOGIC</h2>
        <section>
          <input
            type="text"
            placeholder="     Enter a number"
            onChange={handleGuessedNumber}
            value={ans}
            id="guess"
            onKeyPress={handleKeyPressed}
          ></input>
          <br></br>
          <button
            type="submit"
            className="button-check"
            onClick={checkTheNumber}
          >
            CHECK
          </button>
          <h3 className="result">{result}</h3>
          <br></br>
          <button
            type="submit"
            className="button-ammend"
            onClick={clearTheField}
          >
            AMEND
          </button>
          <br></br>
          <button type="submit" className="button-restart" onClick={restart}>
            RESTART
          </button>
        </section>
      </div>
      <div className="scoreBoard">
        <h2>SCORE BOARD</h2>
        <section>
          <div className="total">
            <h3>TOTAL</h3>
            <h3 style={{ color: "white" }}>{total}</h3>
          </div>
          <div className="wins">
            <h3>WINS</h3>
            <h3 style={{ color: "white" }}>{wins}</h3>
          </div>
          <div className="loses">
            <h3>LOSES</h3>
            <h3 style={{ color: "white" }}>{loses}</h3>
          </div>
        </section>
      </div>
    </div>
  );
};
export default App;

// import React from 'react';

// function Quiz(){
// 	handleAnswerChange(event){
// 		if(event.key === 'y'){
// 			alert('The sky is your starting point!')
// 	}
// 		else if (event.key === 'n') {
// 			alert('The sky is your limit👀')
// 	}
// }

// 	return (
// 		<div>
// 				<p> Are You Smart?</p>
// 					<input type="text" value={answer} onKeyPress={handleAnswerChange}/>
// 				<small> Press Y for Yes or N for No</small>
// 	</div>
// )
// }
