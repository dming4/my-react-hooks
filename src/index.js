import React, { memo,  useRef, useState,  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// side effect 
//在浏览器渲染后执行,不会阻塞浏览器运行
let lastDependencies
function useEffect(callback,dependencies) {
  if (!lastDependencies) {
    lastDependencies = dependencies;
    setTimeout(() => {
      callback();
    }, 0);
   }
  else {
    let changed = !dependencies.every((item, idx) => item === lastDependencies[idx])
    if (changed) {
      lastDependencies = dependencies;
      callback();
    }
  }
 
}

//在浏览器渲染前执行,会阻塞浏览器运行
let lastLayOutDependencies
function useLayoutEffect(callback,dependencies) {
  if (!lastLayOutDependencies) {
    lastLayOutDependencies = dependencies;
    queueMicrotask(callback);
   }
  else {
    let changed = !dependencies.every((item, idx) => item === lastLayOutDependencies[idx])
    if (changed) {
      lastLayOutDependencies = dependencies;
      queueMicrotask(callback);
    }
  }
 
}

//空闲时间执行callback
// 60hz 1frame:16.67ms 
// requestIdleCallback


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


function Animation() {
  let ref = useRef();
  useLayoutEffect(() => {
    console.log('useEffect');
    
    ref.current.style.transform = 'translate(500px)'
    ref.current.style.transition = 'all 500ms'
    
  })
  console.log('render');

  return <div ref={ref} style={{
    width: '100px',
    height: '100px',
    backgroundColor:'red'
  }}></div>
}

function render() {
  root.render(
    <Animation/>
   );
}
render()
