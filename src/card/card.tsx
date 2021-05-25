import React, {useState} from "react";
import styled from "styled-components";

const CardTemplate = styled.div`
  width: 80%;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid gray;
`

const ProductField = styled.div`
  width: 100%;
  font-size: 25px;
  margin: 10px 0px;
`

const ProductButton = styled.button`
  width: 100%;
  height: 35px;
  background-color: transparent;
  border-radius: 10px;
  border: 0;
  transition: 400ms;
  :hover{
    background-color: gray;
    color: white;
  }
`

type Props = {
    ProductName: string,
    Description: string,
    HaveParents: boolean
    data: ObjectFromArray
    ProductID: string
}

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

const findAllParents = (data: ObjectFromArray, productID: string): Array<OBJ> => {
    let arrayParents: Array<OBJ> = []
    if(data[productID]?.ParentID){
        arrayParents.push(...findAllParents(data, data[productID].ParentID as string))
    }
    return [data[productID], ...arrayParents]
}

const ShowAllParents = (array: Array<OBJ>): JSX.Element => {
    return <>{array.map(elem =>
        elem?.Name === undefined? 'Элемент не найден в базе':
            <CardTemplate>
                <ProductField>Product name: {elem.Name}</ProductField>
                <ProductField>Description: {elem.descriptionru}</ProductField>
                <ProductField>ProductID: {elem.ProductID}</ProductField>
                <ProductField>ParentID: {elem.ParentID}</ProductField>
            </CardTemplate>
    )
    }</>
}

export default function Card({ProductName, Description, HaveParents, data, ProductID}: Props){
    const [showParent, setShowParents] = useState(false)
    const Parents = findAllParents(data, ProductID).slice(1)
    return (
        <CardTemplate>
            <ProductField>Product name: {ProductName}</ProductField>
            <ProductField>Description: {Description}</ProductField>
            <ProductField>ParentID: {data[ProductID].ParentID}</ProductField>
            {Parents.length !== 0?<ProductButton onClick={()=>{setShowParents(!showParent)}}>{showParent? 'Hide': 'Show'} parent(s)</ProductButton>:''}
            {showParent? ShowAllParents(Parents):''}
        </CardTemplate>
    )
}
