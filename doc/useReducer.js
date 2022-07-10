import React, { memo,  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
      break;
  
    default:
      return 0
      break;
  }
}
let lastState
function useReducer(reducer, initValue) {
  lastState=lastState || initValue;
  let dispatch = function (action) {
    lastState= reducer(lastState, action);
    render();
  }
  return [lastState,dispatch]
}

function App() {
  console.log('App.Render');
  
  let [state,dispatch]=useReducer(reducer,10)
  
  return (
    <>
      {`num:${state}`}<br/>
      <button onClick={() => { dispatch({type:'add'}) }}>click</button>
     
  </>)
}



const root = ReactDOM.createRoot(document.getElementById('root'));


function render() {
  root.render(
    <App/>
   );
}
render()
