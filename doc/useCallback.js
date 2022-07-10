import React, { memo,  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let lastStates=[]
let index;
function useState(initValue) {
  let state = lastStates[index] || initValue;
  let currIndex = index;
  let setState = (newState) => {
    lastStates[currIndex] = newState;
    render();
  }
  index++
  return [state,setState]
}
let lastMemo
let lastMemoDependencies
function useMemo(callback,dependencies) {
  if (!lastMemo) {
    lastMemo = callback();
    lastMemoDependencies = dependencies;
   }
  else {
    let changed = !dependencies.every((item, idx) => item === lastMemoDependencies[idx])
    if (changed) {
      lastMemo = callback();
      lastMemoDependencies = dependencies;
    }
  }
  return lastMemo;
}
let lastCallback
let lastCallbackDependencies
function useCallback(callback,dependencies) {
  if (!lastCallback) {
    lastCallback = callback;
    lastCallbackDependencies = dependencies;
   }
  else {
    let changed = !dependencies.every((item, idx) => item === lastCallbackDependencies[idx])
    if (changed) {
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  }
  return lastCallback;
}

function Child({data,addClick }) {
  console.log('Child.Render');
  debugger
 console.log(addClick.constructor);
  
  return (
    <>
    <div>myChild {data.num1}</div>
      <button onClick={addClick}>Child Click</button>
    </>
  )
}
Child=memo(Child)

let lastSetNum1
function App() {
  console.log('App.Render');
  index=0

  let [num, setNum] = useState(0)
  let [num1, setNum1] = useState(10)
  let data = useMemo(() => ({ num1 }), [num1])
  
  let addClick = useCallback(() => (setNum1(num1 + 1)), [num1]);
  console.log('lastSetNum1=setNum1',lastSetNum1===addClick);
  lastSetNum1=addClick
  
  return (
    <>
      {`num:${num}`}
      <button onClick={() => { setNum(num + 1) }}>click</button><br/>
      {`num1:${num1}`}<button onClick={() => { setNum1(num1 + 1) }}>click</button>
      <Child data={data} addClick={addClick}></Child>
  </>)
}



const root = ReactDOM.createRoot(document.getElementById('root'));


function render() {
  root.render(
    <App/>
   );
}
render()
