import React from "react";
import styled, {keyframes} from "styled-components";

const rotation = keyframes`
  0%{}
  100%{
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  position: absolute;
  top: 50%;
  background-color: cyan;
  width: 100px;
  height: 5px;
  border-radius: 3px;
  animation-name: ${rotation};
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
`

export default function(){
    return <Loader/>
}
