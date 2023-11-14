import { useState } from 'react';
import CharacterCanvas from './CharacterCanvas.tsx'
import Footer from './Footer.tsx'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([true]);
  const addCharacter = () => {

    setCharacters(characters => [...characters, true])
  }
  const addSpace = () => {
    setCharacters(characters => [...characters, false])
  }
  const deleteCharacter = () => {
    setCharacters((characters) => characters.filter((_, index) => index < (characters.length - 1)));
  }

  return (
    <div className='flex flex-col'>
      <div className='flex h-auto flex-grow flex-wrap'>
        {characters.map((isCharacter, i) => isCharacter ? <CharacterCanvas key={i}/> : <div key={i} className='w-10 bg-white/5'></div>)}
        <div className='flex flex-col'>
          <button onClick={deleteCharacter} className='bg-red-500 hover:bg-red-400  text-black h-6 w-8 rounded justify-self-start '>x</button>
          <button onClick={addCharacter} className='bg-white/30 hover:bg-white/60  text-black h-6 w-8 rounded justify-self-center'>+</button>
          <button onClick={addSpace} className='bg-white/60 hover:bg-white/90  text-black h-6 w-8 rounded justify-self-center'>_</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App