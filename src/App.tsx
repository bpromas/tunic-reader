import { useState } from 'react';
import CharacterCanvas from './CharacterCanvas.tsx'
import Footer from './Footer.tsx'
import './App.css'

function App() {
  const [count, setCount] = useState(1);

  const addCharacter = () =>{
    setCount(count+1)     
  }
  const deleteCharacter = () =>{
    setCount(count-1)     
  }

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        {[...Array(count)].map((i) => <CharacterCanvas key={i}/>)}
        <div className='flex flex-col'>
          <button onClick={deleteCharacter} className='bg-red-500 hover:bg-red-400  text-black h-6 w-8 rounded justify-self-start '>x</button>
          <button onClick={addCharacter} className='bg-white/30 hover:bg-white/60  text-black h-6 w-8 rounded justify-self-center'>+</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App