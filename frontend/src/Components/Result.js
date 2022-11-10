import React from 'react'

export default function Result({hamsterWinner, hamsterLoser}) {
 



  function Start() {
    window.location.reload()
  }
  return (
    <div className='result-flex'>
        {
            
        <div className='result-win'>
        <p>Winner: {hamsterWinner.name}</p>
        <p>Total Wins: {hamsterWinner.wins}</p>
        <p>Total Defeats: {hamsterWinner.defeats}</p>
      
        </div> 
        }

        {
           <div className='result-lose'>
                <p>Loser: {hamsterLoser.name}</p>
                <p>Total Wins: {hamsterLoser.wins}</p>
                <p>Total Defeats: {hamsterLoser.defeats}</p>
            </div> 
        }
        <div className='Btn-center'>
    <button className='btn-newGame' onClick={Start}>NewGame</button>
    </div>
    </div>
  )
}