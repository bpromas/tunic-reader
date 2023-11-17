import { useState } from 'react';
import CharacterCanvas from './CharacterCanvas.tsx'
import Footer from './Footer.tsx'
import './App.css'

function App() {
  const [isCharacters, setIsCharacters] = useState([true]);
  const [ipaStrings, setIpaStrings] = useState([""]);

  const addCharacter = () => {
    setIsCharacters(characters => [...characters, true])
    setIpaStrings(ipaStrings => [...ipaStrings, ""])
  }
  const addSpace = () => {
    setIsCharacters(characters => [...characters, false])
    setIpaStrings(ipaStrings => [...ipaStrings, " "])
  }
  const deleteCharacter = () => {
    setIsCharacters((characters) => characters.filter((_, index) => index < (characters.length - 1)));
  }

  const onChange = (index, ipa) => {
    console.log(ipaStrings);
    const newIpaStrings = ipaStrings.map((v, i) => index == i ? ipa : v)
    setIpaStrings(newIpaStrings)
    
  }

  return (
    <div className='flex flex-col'>
      <div className='flex h-auto flex-wrap'>
        {isCharacters.map((isCharacter, i) => <CharacterCanvas key={i} isCharacter={isCharacter} index = {i} onChange = {onChange}/>)}
        <div className='flex flex-col'>
          <button onClick={deleteCharacter} className='bg-red-500 hover:bg-red-400 text-black h-6 w-8 rounded justify-self-start'>x</button>
          <button onClick={addCharacter} className='bg-white/30 hover:bg-white/60 text-black h-6 w-8 rounded justify-self-center'>+</button>
          <button onClick={addSpace} className='bg-white/60 hover:bg-white/90 text-black h-6 w-8 rounded justify-self-center'>_</button>
        </div>
      </div>
      <div>{ipaStrings}</div>
      <hr />
      <Footer />
    </div>
    // <div key={i} className='w-10 bg-white/5'></div>
  )
}

export default App