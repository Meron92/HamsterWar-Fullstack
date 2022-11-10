import React from "react";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64"
import {Link} from "react-router-dom"
import { baseURL } from "../Utils/baseURL";
import ShowMoreInfo from "./ShowMoreInfo";

export default function Gallery() {
  const [hamsters, setHamsters] = useState([]);
  const [name,setName] = useState()
  const [age,setAge] = useState()
  const [favFood, setFavFood] = useState()
  const [loves, setLoves] = useState()
  const [img, setImg] = useState()
  const [allInfo, setAllInfo] = useState([])
 const [showInfo, setShowInfo] = useState(false)




  async function moreInfo(id) {
    const response = await fetch(`${baseURL}/hamster` + id._id,
   {
     method:"GET"
   })
   const data =  await response.text()
 setAllInfo(id)
 setShowInfo(true)
 }

  function hamster() {
    fetch(`${baseURL}/hamsters/`)
      .then((response) => response.json())
      .then((data) => setHamsters(data));
  }


  async function deleteHamster(id) {
    const response = await fetch(
      `${baseURL}/hamsters/delete/` + id,
      {
        method: "DELETE",
      }
    );
    const data = await response.text();
    setHamsters((hamsters) =>
      hamsters.filter((hamsters) => hamsters._id !== id)
    );
  }

  

  async function addHamster() {
    let hamster = {
      name: name,
      age: age,
      loves: loves,
      favFood: favFood,
      imgName: img
    }
    const response = await fetch(`${baseURL}/hamsters/`, {
      method: "POST",
      body: JSON.stringify(hamster),
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
   setHamsters([...hamsters, data])
   console.log(data);
  }
  useEffect(() => {
    hamster();
  }, []);


  return (
    <div>
      <Link to="/"><button>Home</button></Link>
      <h1 className="gallery-h1">Hamsters Gallery</h1>
      <form onSubmit={()=>addHamster()} className="gallery-field">
      <fieldset>
        <legend>Add new hamster</legend>
        <label>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
          </label>
          
          <label>
          <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
          </label>
          <label>
          <input type="text" placeholder="Loves" onChange={(e) => setLoves(e.target.value)}/>
          </label>
          <label>
          <input type="text" placeholder="Favorite Food" onChange={(e) => setFavFood(e.target.value)}/>
          </label>
          <FileBase64
          className="file"
          multiple={false}
          onDone={({base64}) => setImg(base64)}
          />
          <input type="submit" value="Skicka in"/>
          </fieldset>
      </form>
 
             { showInfo ? <ShowMoreInfo allInfo={allInfo} showInfo={setShowInfo} /> : null }
             <div className="center-gallery">
      {hamsters.map((hamster, i) => {
        return (
          
          <div key={i} >
           <div className="flex-gallery">
            <h1> {hamster.name}</h1>
            <img    src={hamster.imgName} alt="hamster"  />
            </div>
            <button className="delete-btn" onClick={() => deleteHamster(hamster._id)}>Delete</button>
            <button  className="moreInfo-btn"onClick={() => moreInfo(hamster)}>More Info</button>
          </div>
        );
      })}

</div>
    </div>
  );
}