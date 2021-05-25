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
    ProductID: string,
    data: Array<OBJ>
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

const findAllChildren = (data: Array<OBJ>, ParentID:string): Array<OBJ> => {
    return data.filter(elem => elem.ParentID === ParentID)
}
const createChildrenCards = (data: Array<OBJ>) => {
    return data.map(elem => <CardTemplate>
        <ProductField>Product name: {elem.Name}</ProductField>
        <ProductField>Type: {elem.Type}</ProductField>
        <ProductField>Description: {elem.Name}</ProductField>
    </CardTemplate>)
}

export default function Card({ProductName, Description, ProductID, data}: Props){
    const [showChildren, setShowChildren] = useState(false)
    const children = findAllChildren(data, ProductID)
    const childrenCards = createChildrenCards(children)
    return (
        <CardTemplate>
            <ProductField>Product name: {ProductName}</ProductField>
            <ProductField>Description: {Description}</ProductField>
            {children.length!==0?<ProductButton onClick={()=>{setShowChildren(!showChildren)}}>{showChildren?'Hide':'Show'} children</ProductButton>:''}
            {showChildren? childrenCards:''}
        </CardTemplate>
    )
}
