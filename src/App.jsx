import { useState } from 'react'
import { useEffect } from "react";
import lampOn from "/lamp_on.svg"
import lampOff from "/lamp_off.svg"
import './App.css'
import Square from "./Components/Square.jsx";

function App() {
    
  // INITIALIZING STATE VARIABLES
  const [squares, setSquares] = useState(Array(9).fill(""))
  const [isXturn, setIsXturn] = useState(true)
  const [status, setStatus] = useState("")  
  const [xScore, setXScore] = useState(0)
  const [oScore, setOScore] = useState(0)
  const [latestWinner, setLatestWinner] = useState("")
  const [lightMode, setLightMode] = useState(true)
  
  // DISPLAYING X AND O ON BOARD
  function handleClick(clickedSquare) {
      
      let copySquares = [...squares]
      if (getWinner(copySquares) || copySquares[clickedSquare]) return
      copySquares[clickedSquare] = isXturn ? "X" : "O"
      setIsXturn(!isXturn)
      setSquares(copySquares)
  }   
  
  // CHECKING IF THERE'S A WINNER
  function getWinner(squares) {
      const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];
      
      for (let i = 0; i < winPatterns.length; i++) {
          const [a, b, c] = winPatterns[i]
          
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a]
          }
      }
      
      return null
  }
  
  // HANDLING RESULT TEXT, SCORE COUNTER, AND SETTING VARIABLE FOR LAST WINNER
  useEffect(() => {
      if(!getWinner(squares) && squares.every(item => item !== "")) {
          setStatus("Draw")
      } else if (getWinner(squares)) {
          setStatus(`Winner is ${getWinner(squares)}`)
          if (getWinner(squares) === "X") {
              setXScore((prevXScore) => {
                  prevXScore = prevXScore + 1;
                  setLatestWinner("X")
                  return prevXScore
              })
          } else if (getWinner(squares) === "O") {
              setOScore((prevOScore) => {
                  prevOScore = prevOScore + 1;
                  setLatestWinner("Y")
                  return prevOScore
              })
          }
      } else {
          setStatus(`Current player: ${isXturn ? "X" : "O"}`)
      }
  }, [squares, isXturn ])
    
  // RESETTING GAME, THE PREVIOUS GAME'S LOSER STARTS NEXT ROUND
  function restartGame() {
      setIsXturn(latestWinner === "X" ? false : true);
      setSquares(Array(9).fill(""))
  }

  // FUNCTION FOR GETTING YEAR TO DISPLAY IN FOOTER
  function getYear() {
      const date = new Date();
      return date.getFullYear();
  }
  
  // FUNCTION FOR HANDLING LIGHT AND DARK MODES
  function handleLightSwitch() {
      setLightMode((prevLightMode) => {
          return !prevLightMode;
      });
  }
  
  useEffect(() => {
      document.body.style.backgroundColor = lightMode ? "white" : "black";
      document.body.style.color = lightMode ? "black" : "white";
  }, [lightMode]);

  return (
      <div className="game-container">
        <img
            onClick={handleLightSwitch}
            src={lightMode ? lampOn : lampOff}
            alt="A bulb's icon for toggling light and dark mode"
        />
        <h2>{status}</h2>
        <div className="board">
            <Square lightMode={lightMode} value={squares[0]} onClick={() => handleClick(0)}></Square>
            <Square lightMode={lightMode} value={squares[1]} onClick={() => handleClick(1)}></Square>
            <Square lightMode={lightMode} value={squares[2]} onClick={() => handleClick(2)}></Square>
            <Square lightMode={lightMode} value={squares[3]} onClick={() => handleClick(3)}></Square>
            <Square lightMode={lightMode} value={squares[4]} onClick={() => handleClick(4)}></Square>
            <Square lightMode={lightMode} value={squares[5]} onClick={() => handleClick(5)}></Square>
            <Square lightMode={lightMode} value={squares[6]} onClick={() => handleClick(6)}></Square>
            <Square lightMode={lightMode} value={squares[7]} onClick={() => handleClick(7)}></Square>
            <Square lightMode={lightMode} value={squares[8]} onClick={() => handleClick(8)}></Square>
        </div>
        <div className="score-line">
            <h2><span className="player-marker">X</span> wins: {xScore}</h2>
            <button className="restart-button" onClick={restartGame}>Restart</button>
            <h2><span className="player-marker">O</span> wins: {oScore}</h2>
        </div>
        <p>RadiMarko - {getYear()}</p>
      </div>
  )
}

export default App
