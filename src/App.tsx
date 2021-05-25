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


function generateCards(data: Array<OBJ>): JSX.Element{
  let arrayCards = data.map((elem, key) => !elem.isDeleted && elem.ParentID === null? <Card ProductName={elem.Name}
                                                                                            data={data}
                                                                                     Description={elem.descriptionru}
                                                                                     key={key}
                                                                                     ProductID={elem.ProductID}/>:<></>)
  return <>{arrayCards}</>
}

function App() {
  const {isLoading, data} = useFetch('https://support.stream-labs.com/api/products')
  return isLoading ? <Loader/> : generateCards(data as Array<OBJ>)
}

export default App;
