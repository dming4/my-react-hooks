import React, { memo,  useState,  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let Context = React.createContext();
function useContext(Context) {
  console.log('Context',Context);
  return Context._currentValue
}


export default function Counter() {

  let {state,setState}=useContext(Context)
  
  return (
    <>
      {`num:${state}`}<br/>
      <button onClick={() =>  setState(state+1)}>click</button>
     
  </>)
}


function App() {
  console.log('App.Render');
  
  let [state, setState] = useState(0);
  
  return (
    <>
      <Context.Provider value={{ state, setState }}>
        <Counter></Counter>
      </Context.Provider>
     
  </>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));


function render() {
  root.render(
    <App/>
   );
}
render()
