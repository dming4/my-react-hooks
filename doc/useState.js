import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let lastState
function useState(initValue) {
  let state = lastState || initValue;
  let setState = (newState) => {
    lastState = newState;
    render();
  }
  return [state,setState]
}

function App() {
  let [num, setNum] = useState(0)
  return (
    <>
      {num}
    <button onClick={()=>{setNum(num+1)}}>click</button>
  
  </>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));


function render() {
  root.render(
    <App/>
   );
}
render()
