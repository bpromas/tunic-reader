import { useState } from 'react';
import CharacterCanvas from './CharacterCanvas.tsx'
import Footer from './Footer.tsx'
import Header from './Header.tsx'
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
    setIpaStrings((ipaStrings) => ipaStrings.filter((_, index) => index < (ipaStrings.length - 1)));
  }

  const copyIpa = () => {
    navigator.clipboard.writeText(ipaStrings.join(""))
  }

  const onChange = (index, ipa) => {
    console.log(ipaStrings);
    const newIpaStrings = ipaStrings.map((v, i) => index == i ? ipa : v)
    setIpaStrings(newIpaStrings)
  }



  return (
    <div className='flex flex-col'>
      <Header />
      <hr />
      <div className='flex h-auto flex-wrap my-4 justify-center'>
        {isCharacters.map((isCharacter, i) => <CharacterCanvas key={i} isCharacter={isCharacter} index = {i} onChange = {onChange}/>)}
        <div className='flex flex-col mx-4'>
          <button onClick={deleteCharacter} className='bg-red-500 hover:bg-red-400 text-black h-6 w-8 rounded justify-self-start'>x</button>
          <button onClick={addCharacter} className='bg-white/30 hover:bg-white/60 text-black h-6 w-8 rounded justify-self-center'>+</button>
          <button onClick={addSpace} className='bg-white/60 hover:bg-white/90 text-black h-6 w-8 rounded justify-self-center'>_</button>
        </div>
      </div>
      <div className='text-2xl my-4'>
        <p>Full translation (IPA):</p> 
        <p className='text-4xl'>{ipaStrings}</p> 
        <button onClick={copyIpa} className='bg-white/60 hover:bg-white/90 text-black h-8 w-12 rounded text-sm'>Copy</button>
      </div>
      <hr />
      <Footer />
    </div>
  )
}

export default App