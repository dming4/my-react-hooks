import React, { memo, useState,  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//side effect
let lastDependencies
function useEffect(callback,dependencies) {
  if (!lastDependencies) {
    lastDependencies = dependencies;
    callback();
   }
  else {
    let changed = !dependencies.every((item, idx) => item === lastDependencies[idx])
    if (changed) {
      lastDependencies = dependencies;
      callback();
    }
  }
 
}

function App() {
  console.log('App.Render');
  
  let [state, setState] = useState(10)
  
  useEffect(() => {
    console.log(state);
  },[state])
  
  return (
    <>
      {`num:${state}`}<br/>
      <button onClick={() => { setState(state+1) }}>click</button>
     
  </>)
}



const root = ReactDOM.createRoot(document.getElementById('root'));


function render() {
  root.render(
    <App/>
   );
}
render()
