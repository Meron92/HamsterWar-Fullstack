import React from 'react'
export default function ShowMoreInfo({allInfo}) {


  return (
    <div className='moreInfoContainer'>
        
      <p>Name: {allInfo.name}</p>
      <p>Age: {allInfo.age}</p>
      <p>Favorite Food: {allInfo.favFood}</p>
      <p>Loves: {allInfo.loves}</p>

        
    </div>
  )
}