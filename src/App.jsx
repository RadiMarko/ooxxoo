import { useState } from 'react'
import { useEffect } from "react";
import './App.css'
import Square from "./Components/Square.jsx";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""))
  const [isXturn, setIsXturn] = useState(true)
  const [status, setStatus] = useState("")  
  
  function handleClick(clickedSquare) {
      
      let copySquares = [...squares]
      if (getWinner(copySquares) || copySquares[clickedSquare]) return
      copySquares[clickedSquare] = isXturn ? "X" : "O"
      setIsXturn(!isXturn)
      setSquares(copySquares)
  }   
  
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
  
  useEffect(() => {
      if(!getWinner(squares) && squares.every(item => item !== "")) {
          setStatus("Draw")
      } else if (getWinner(squares)) {
          setStatus(`Winner is ${getWinner(squares)}`)
      } else {
          setStatus(`Next player is ${isXturn ? "X" : "O"}`)
      }
  }, [squares, isXturn ])
    
  function restartGame() {
      setIsXturn(true);
      setSquares(Array(9).fill(""))
  }  

  return (
      <div className="game-container">
        <div className="row">
            <Square value={squares[0]} onClick={() => handleClick(0)}></Square>
            <Square value={squares[1]} onClick={() => handleClick(1)}></Square>
            <Square value={squares[2]} onClick={() => handleClick(2)}></Square>
        </div>
        <div className="row">
            <Square value={squares[3]} onClick={() => handleClick(3)}></Square>
            <Square value={squares[4]} onClick={() => handleClick(4)}></Square>
            <Square value={squares[5]} onClick={() => handleClick(5)}></Square>
        </div>
        <div className="row">
            <Square value={squares[6]} onClick={() => handleClick(6)}></Square>
            <Square value={squares[7]}  onClick={() => handleClick(7)}></Square>
            <Square value={squares[8]} onClick={() => handleClick(8)}></Square>
        </div>
        <h1>{status}</h1>
        <button onClick={restartGame}>Restart</button>  
      </div>
  )
}

export default App
