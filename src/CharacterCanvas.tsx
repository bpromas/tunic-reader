import React, {useState} from 'react'

function CharacterCanvas({isCharacter, index, onChange}) {
  const [ipaString, setipaString] = useState("");
  const [tuscii, setTuscii] = useState(0b000000000000);

  const fullVowel: number = 3968
  const fullConsonant: number = 126

  const xCoords = ["5", "83", "161"]
  const yCoords = ["5", "35", "65", "125", "155", "185", "195"]
  const inverterRadius = 10

  const handleClick = (event: React.MouseEvent<SVGElement>) => {
    let line = event.target;
    // type safety
    if (!(line instanceof SVGElement)) {
      return;
    }
    
    let bit = parseInt(line.dataset.tuscii)  
    let toggledTuscii = tuscii ^ bit // toggles the "bit" representing the clicked line
    let ipa = getIPA(toggledTuscii)

    onChange(index, ipa)
    
    setTuscii(toggledTuscii)
    setipaString(ipa)
  }

  const getIPA = (tuscii: number) => {
    const consonantIPA = consonantDictionary[tuscii & fullConsonant] || ""
    const vowelIPA = vowelDictionary[tuscii & fullVowel] || ""
    return tuscii % 2 === 0 ? (consonantIPA + vowelIPA).toString()
                            : (vowelIPA + consonantIPA).toString()
  }

  const consonantDictionary = {
    "10": "w",
    "20": "dʒ",
    "34": "p",
    "36": "l",
    "38": "ɹ",
    "40": "tʃ",
    "42": "t",
    "44": "j",
    "46": "θ",
    "50": "f",
    "54": "s",
    "68": "b",
    "70": "k",
    "76": "v",
    "80": "m",
    "84": "d",
    "88": "n",
    "94": "ʒ",
    "98": "g",
    "100": "h",
    "108": "z",
    "116": "ð",
    "122": "ʃ",
    "126": "ŋ",
  }
  const vowelDictionary = {
    "128": "aɪ",
    "256": "eɪ",
    "384": "ə",
    "768": "ɒ",
    "896": "æ",
    "1024": "ɔɪ",
    "1536": "ʊ",
    "1920": "uː",
    "2048": "aʊ",
    "2560": "ɛr",
    "2816": "ɪr",
    "2944": "ɔːr",
    "3072": "ɪ",
    "3456": "ɑːr",
    "3584": "ɛ",
    "3712": "ɜːr",
    "3840": "iː",
    "3968": "oʊ",
  }

  return isCharacter ? (
    <div className='flex flex-col w-[156px]'>
      <svg height="210" strokeLinecap="round" onClick={handleClick} className="stroke-[10px] ml-[-10px]">

        {/* ordem das linhas sempre começando no canto superior direito e seguindo sentido anti-horário */}
        {/* consonant lines */}

        <line x1={xCoords[1]} y1={yCoords[2]} x2={xCoords[2]} y2={yCoords[1]} data-tuscii={2} className={`${tuscii & 2 ? "stroke-red-600" : "stroke-red-400/20"} hover:stroke-red-400`} />
        <line x1={xCoords[1]} y1={yCoords[2]} x2={xCoords[1]} y2={yCoords[0]} data-tuscii={4} className={`${tuscii & 4 ? "stroke-red-600" : "stroke-red-400/20"} hover:stroke-red-400`}/>
        <line x1={xCoords[1]} y1={yCoords[2]} x2={xCoords[0]} y2={yCoords[1]} data-tuscii={8} className={`${tuscii & 8 ? "stroke-red-600" : "stroke-red-400/20"} hover:stroke-red-400`}/>
        <line x1={xCoords[1]} y1={yCoords[3]} x2={xCoords[0]} y2={yCoords[4]} data-tuscii={16} className={`${tuscii & 16 ? "stroke-red-600" : "stroke-red-400/20"} hover:stroke-red-400`}/>
        <line x1={xCoords[1]} y1={yCoords[3]} x2={xCoords[1]} y2={yCoords[5]} data-tuscii={32} className={`${tuscii & 32 ? "stroke-red-600" : "stroke-red-400/20"} hover:stroke-red-400`}/>
        <line x1={xCoords[1]} y1={yCoords[3]} x2={xCoords[2]} y2={yCoords[4]} data-tuscii={64} className={`${tuscii & 64 ? "stroke-red-600" : "stroke-red-400/20"} hover:stroke-red-400`}/>

        {/* vowel lines */}
        <line x1={xCoords[1]} y1={yCoords[0]} x2={xCoords[2]} y2={yCoords[1]} data-tuscii={128} className={`${tuscii & 128 ? "stroke-blue-600" : "stroke-blue-400/20"} hover:stroke-blue-400`}/>
        <line x1={xCoords[0]} y1={yCoords[1]} x2={xCoords[1]} y2={yCoords[0]} data-tuscii={256} className={`${tuscii & 256 ? "stroke-blue-600" : "stroke-blue-400/20"} hover:stroke-blue-400`}/>
        <line x1={xCoords[0]} y1={yCoords[1]} x2={xCoords[0]} y2={yCoords[4]} data-tuscii={512} className={`${tuscii & 512 ? "stroke-blue-600" : "stroke-blue-400/20"} hover:stroke-blue-400`}/>
        <line x1={xCoords[0]} y1={yCoords[4]} x2={xCoords[1]} y2={yCoords[5]} data-tuscii={1024} className={`${tuscii & 1024 ? "stroke-blue-600" : "stroke-blue-400/20"} hover:stroke-blue-400`}/>
        <line x1={xCoords[2]} y1={yCoords[4]} x2={xCoords[1]} y2={yCoords[5]} data-tuscii={2048} className={`${tuscii & 2048 ? "stroke-blue-600" : "stroke-blue-400/20"} hover:stroke-blue-400`}/>
        <circle cx={xCoords[1]} cy={yCoords[6]} r={inverterRadius} fill="none" data-tuscii={1} className={`${tuscii & 1 ? "stroke-green-600" : "stroke-green-400/20"} hover:stroke-green-400 stroke-[8px]`}/>
      </svg>
      <div className='text-xs'>
        <div>consonant: {consonantDictionary[tuscii & fullConsonant] || "?"}</div>
        <div>vowel: {vowelDictionary[tuscii & fullVowel] || "?"}</div>
        <div>IPA: {ipaString || "?"}</div>
      </div>
    </div>
  ) : (<div className='w-[50px] bg-white/5'></div>)
}

export default CharacterCanvas