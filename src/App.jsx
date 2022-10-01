import React from 'react'
import './App.css'
import Dice from './components/Dice'
import { nanoid } from "nanoid"
import Confetti from './components/Confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [numOfRolls, setNumOfRolls] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(23450);
  console.log(time)
  console.log(running)

  React.useEffect(() => {
    const bestTime = JSON.parse(localStorage.getItem("bestTime"));
    if (bestTime) {
      setBestTime(bestTime);
    }
  }, []);

  React.useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const someHeld = dice.some((die) => die.isHeld);
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (someHeld) {
      setRunning(true);
    }

    if (allHeld && allSameValue) {
      setRunning(false);
      let currentTime = time;
      if (currentTime < bestTime) {
        setBestTime(currentTime);
        localStorage.setItem("bestTime", JSON.stringify(currentTime));
      }
      setTenzies(true)
    }
  }, [dice, time, bestTime]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setNumOfRolls((prevState) => prevState + 1);
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDice();
      })
      );
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setNumOfRolls(0);
      setTime(0);
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    }))
  }

  const diceElements = dice.map(dice => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <div className="App">
      <div className='container'>
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same.
          Click each die to freeze it at its
          current value between rolls.</p>
        <div className='rollsCount'>Number of Rolls: {numOfRolls}</div>

        <div className='time'>
          <div className='currentTime'>
            <div>Current Time</div>
            <div>
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
              {("0" + ((time / 10) % 100)).slice(-2)}
            </div>
          </div>

          <div className='bestTime'>
            <div>Best Time</div>
            <div>
              {("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
              {("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:
              {("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}
            </div>
          </div>
        </div>
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App
