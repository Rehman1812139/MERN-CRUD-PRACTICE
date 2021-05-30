import './App.css';
import React, { Component, useState, useEffect}  from 'react';
import Axios from 'axios';

function App() {
const [foodname,setfood]=useState('')
const [daysSinceIAte,setdaysSinceIAte]=useState('')
const [taste,settaste]=useState('')


const addToList=()=>{
  Axios.post("http://localhost:3001/insert",{
     foodname:foodname,
     daysSinceIAte:daysSinceIAte,
     taste:taste
  });
}

const [list,setlist]=useState([])

useEffect(()=>{
  Axios.get("http://localhost:3001/read").then((response)=>{
    setlist(response.data)
  })
},[])


const deleteFood=(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`)
}

const[newfoodname,setnewfoodname]=useState('')
const[newdays,setnewdays]=useState('')
const[newtaste,setnewtaste]=useState('')

const updatefoodname=(id)=>{
Axios.put('http://localhost:3001/update',{
    id:id,
    newfoodname:newfoodname,
  })}
  const updatedays=(id)=>{
    Axios.put('http://localhost:3001/update',{
        id:id,
        newdays:newdays,
      })}

      const updatetaste=(id)=>{
        Axios.put('http://localhost:3001/update',{
            id:id,
            newtaste:newtaste,
          })}
      



  return (
    <div className="App">
      <h1>PRACTICE</h1>
    <label>Food Name:</label><input type ="text" onChange={(event)=>{setfood(event.target.value)}}></input>
    <label>DaysSinceIAte:</label><input type ="text" onChange={(event)=>{setdaysSinceIAte(event.target.value)}}></input>
    <label>Taste:</label><input type ="text" onChange= {(event)=>{settaste(event.target.value)}}></input>
     <button onClick={addToList}>Add to the List</button>
    
    <h1>LIST</h1>
    <table id = 'foods'>
      <thead>
      <th>FoodName</th><th>DaysSinceIAte</th><th>taste</th><th>&nbsp;</th>
      </thead>
      <tbody>
      {list.map((val,key)=>{
        return(
          <tr>
            <td>{val.foodname}
            <input type = "text" placeholder="Enter new Food Name" onChange={(event)=>{setnewfoodname(event.target.valuew)}} />
            </td>
            <td>{val.daysSinceIAte}
            <input type = "text" placeholder="Enter Days" onChange={(event)=>{setnewdays(event.target.valuew)}} />
            </td>
            <td>{val.taste}
            <input type = "text" placeholder="Enter Taste" onChange={(event)=>{setnewtaste(event.target.valuew)}} />
            </td>
            <td><button onClick={()=>{deleteFood(val._id)}}>Delete</button></td>

          </tr>
        )
      })}
      </tbody>
    </table>
    </div>


  );
}

export default App;