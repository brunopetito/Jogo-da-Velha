import React from "react"
import Square from "./Components/Square"

type Scores ={
  [key: string]: number
}

const espacos = ["","","","","","","","",""]

const INITIAL_SCORES: Scores={X:0,O:0}
const WINNING_COMBINATIONS =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

function App() {
  const [gameState,setGameState] = React.useState(espacos)
  const [currentPlayer,setCurrentPlayer] = React.useState("X")
  const [scores,setScores] = React.useState(INITIAL_SCORES)

  React.useEffect(() => {
    const storedScores = localStorage.getItem("scores") 
    if(storedScores){
      setScores(JSON.parse(storedScores))
      
    }

  },[])


  React.useEffect(() =>{
    if(gameState === espacos) return
    itsOver()

  }
,[gameState])

const resetBoard = () => setGameState(espacos)

const handleWin=()=>{
  window.alert(`Parabéns jogador ${currentPlayer} Você ganhou!`)
  const newPlayerScore = scores[currentPlayer] +1
  const newScores={...scores}
  newScores[currentPlayer] = newPlayerScore
  setScores(newScores)
  localStorage.setItem("scores",JSON.stringify(newScores))

resetBoard()
}

const handleDraw=()=>{
  window.alert("Empatou!")
  resetBoard()
}

const handleReset=()=>{
  resetBoard()

}

const itsOver = () =>{
  let roundWon = false

  for(let i = 0; i < WINNING_COMBINATIONS.length; i++){
    const winCombo = WINNING_COMBINATIONS[i]

    let a = gameState[winCombo[0]]
    let b = gameState[winCombo[1]]
    let c = gameState[winCombo[2]]

    if([a,b,c].includes("")){
      continue
    }

    if(a===b && b===c ){
      roundWon = true
      break;
    }
}
if(roundWon){
  setTimeout(() => handleWin(),150)
  return
}
if(!gameState.includes("")){
  setTimeout(() => handleDraw(),150)

  return
}
changePlayer()


}
  const changePlayer=() => {
    setCurrentPlayer(currentPlayer === "X" ? "O" :"X") }

  const handleClick=(event:any)=>{
    const cellIndex= Number(event.target.getAttribute("data-cell-index"))

    const currentValue = gameState[cellIndex]
    if(currentValue){
      return
    }
    const newValues=[...gameState]
    newValues[cellIndex] = currentPlayer
    setGameState(newValues)

  }

  return (
    <div className=" h-full sm:h-screen w-max sm:w-full sm:p-12  p-2 text-slate-800 bg-gradient-to-l from-teal-500 to-cyan-500 ">
      <h1 className="text-center sm:text-5xl mb-12 font-display text-white text-4xl "> Jogo da velha</h1>
      <div>
      <div className="grid grid-cols-3 sm:gap-3 mx-auto sm:w-96 mb-8 gap-1">

      {gameState.map((player,index)=> (
        <Square key={index} onClick={handleClick} {...{index,player}}/>
      ))}

      </div>

      <div className="mx-auto w-96 text-2xl text-serif">
        <div
        className="text-center "
        >

        <button onClick={handleReset} className="border-2 p-2  text-black sm:hover:bg-red-500 sm:hover:text-white transition-colors duration-300">Resetar</button>
        </div>
        <p className="text-white mt-5">Próximo a Jogar: <span>{currentPlayer}</span></p>
        <p className="text-white mt-5">Vitórias de X : <span>{scores["X"]}</span></p>
        <p className="text-white mt-5">Vitórias de O : <span>{scores["O"]}</span></p>

        
        
        </div>



      </div>
    </div>
  )
}

export default App
