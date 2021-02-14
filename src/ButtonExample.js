import { useState } from "react";
import React from 'react';


function Button(props) {
  const handleClick = () => props.clickFunction(props.incrementVal);
	return <button class={`mt-2 mr-2 btn ${props.bsclass} btn-sm`} 
           onClick={handleClick}>
    {props.label}
  </button>;
}

function Display(props) {
  return (
    <div>{ props.countVal }</div>
          )
}

export default function ButtonExample() {
  const [counter, setCounter] = useState(44);
  const changeValue = (valToIncrement) => { setCounter(counter + valToIncrement) };
  
  return (
    <div>
      <Button clickFunction={changeValue} incrementVal={1} label="+1" bsclass="btn-primary" />
      <Button clickFunction={changeValue} incrementVal={-1} label="-1" bsclass="btn-danger" />
      <Button clickFunction={changeValue} incrementVal={5} label="+5" bsclass="btn-primary" />
      <Display countVal={counter} />
    </div>
  )
  
}

/*
ReactDOM.render(
   <App />, 
  document.getElementById('mountNode'),
); */