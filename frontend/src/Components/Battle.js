import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Result from "./Result"
import { baseURL } from "../Utils/baseURL";

export default function Battle() {
  const [randomHamsters, setRandomHamsters] = useState([]);
  const [winner,setWinner] = useState([])
  const[loser,setLoser] =useState([])
  const [showResult, setShowResult] = useState(false)




  function match() {
    fetch(`${baseURL}/hamsters/random`)
      .then((response) => response.json())
      .then((data) => setRandomHamsters(data));
  }
  console.log(randomHamsters);

  async function getWinner(winner) {

    await fetch(`${baseURL}/hamsters/` + winner._id,
    {
      method: "PUT",
      body:JSON.stringify({
        'wins': winner.wins + 1,
        'games': winner.games + 1,
        'defeats': winner.defeats
      }),
      headers: {"Content-Type": "application/json"}
    })
    setWinner({...winner }, winner.wins = winner.wins + 1)
  }


  async function getLoser(loser) {

   await fetch(`${baseURL}/hamsters/` + loser._id,
   {
     method: "PUT",
     body:JSON.stringify({
      'defeats': loser.defeats + 1,
      'games': loser.games + 1,
      'wins': loser.wins 
    }),
     headers: {"Content-Type": "application/json"}
   })
  setLoser({...loser}, loser.defeats = loser.defeats + 1)
  }


   async function handleCuteClick(x,y) {
    await getWinner(x)
    await getLoser(y)
    setLoser(y)
    setWinner(x)
setShowResult(true)
   }
  
 
  useEffect(() => {
    match();
  }, []);


  


  return (
    <div>
      <Link to="/"><button>Home</button></Link>
      <p>Lets go</p>
      <section className="battle-container">
      {randomHamsters.length > 0
        ? randomHamsters.map((hamster, i) => (
            <article key={i} >
              <article className="battle-flex">
              <p>{hamster.name}</p>
              <img  src={hamster.imgName} />
              </article>
              <div className="Btn-center">
              <button className="btn-cute" onClick={() => {handleCuteClick(hamster, randomHamsters?.filter(ham => ham !== hamster) [0]) }}>Cutest</button>
              </div>
            
            </article>
          ))
        : null}
        </section>
      {showResult ? <Result hamsterWinner={winner} hamsterLoser={loser}/> : null}
    </div>
  );
}