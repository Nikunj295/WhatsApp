import React from 'react';
import Login from "./Login";
import useLocalStorage from '../hooks/useLocalStorage';
import DashBoard from "./DashBoard";

function App() { 
  const [id,setId] = useLocalStorage()
  return (
    <>
      {id ? <DashBoard id={id}/> :<Login onIdSubmit={setId}/>}
    </>
  );
}

export default App;
