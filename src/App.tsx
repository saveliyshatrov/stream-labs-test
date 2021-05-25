import React from 'react';
import './App.css';
import Card from './card'
import Loader from './loader'
import useFetch from "react-fetch-hook";

type OBJ = {
  AccessType: null
  Language: string
  Name: string
  ParentID: string | null
  ProductID: string
  Relation: null
  Type: null
  colorscheme: string
  descriptionen: string
  descriptionru: string
  isDeleted: boolean
}

interface ObjectFromArray {
  [key: string]: OBJ
}

function convertArrayToObject(data: Array<OBJ>): ObjectFromArray{
  //Так просто будет удобнее перебирать данные в будущем - когда не будем перебирать массив каждый раз,
  //а когда будем обращаться к нему по ключу
  let obj: ObjectFromArray = {}
  for(let i = 0; i < data.length; i++){
    obj[data[i].ProductID] = data[i]
  }
  return obj
}

function generateCards(data: Array<OBJ>): JSX.Element{
  let convertedOBJ = convertArrayToObject(data)
  let arrayCards = data.map((elem, key) => elem.isDeleted? <></>:<Card ProductName={elem.Name}
                                                                                     Description={elem.descriptionru}
                                                                                     HaveParents={elem.ParentID === null}
                                                                                     key={key}
                                                                                     data={convertedOBJ}
                                                                                     ProductID={elem.ProductID}/>)
  return <>{arrayCards}</>
}

function App() {
  const {isLoading, data} = useFetch('https://support.stream-labs.com/api/products')
  return isLoading ? <Loader/> : generateCards(data as Array<OBJ>)
}

export default App;
