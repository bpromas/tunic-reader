import React, {useState} from 'react'

function CharacterCanvas() {
  const [tuscii, setTuscii] = useState(0b000000000000);
  const [innerTuscii, setInnerTuscii] = useState(0b000000);
  const [outerTuscii, setOuterTuscii] = useState(0b00000);
  const [reverter, setReverter] = useState(false);

  const fullVowel: number = 3968
  const fullConsonant: number = 126

  const x1 = "10"
  const x2 = "60"
  const x3 = "110"

  const y1 = "10"
  const y2 = "50"
  const y3 = "70"
  const y4 = "100"
  const y5 = "120"
  const y6 = "160"
  const y7 = "170"

  const handleClick = (event: React.MouseEvent<SVGLineElement>) => {
    let line = event.target;

    // type safety
    if (!(line instanceof SVGElement)) {
      return;
    }
    
    let index = parseInt(line.dataset.tuscii)
    
    setTuscii(tuscii ^ index)
  }

  const dec2bin = (dec: number) => {
    return (dec >>> 0).toString(2).padStart(12, '0');
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

  return (
    <div>
      <div>TUSCII Code: {tuscii}</div>
      <div>12-bit: {dec2bin(tuscii)}</div>
      <div>consonant: {consonantDictionary[tuscii & fullConsonant]}</div>
      <div>vowel: {vowelDictionary[tuscii & fullVowel]}</div>
      <div>inverter: {tuscii % 2 === 0 ? "false" : "true"} </div>
      <div>IPA: {getIPA(tuscii)}</div>
      <svg height="200" width="200">

        {/* ordem das linhas sempre começando no canto superior direito e seguindo sentido anti-horário */}
        {/* consonant lines */}

        <line x1={x2} y1={y3} x2={x3} y2={y2} onClick={handleClick} data-tuscii={2} strokeLinecap="round" className={`${tuscii & 2 ? "stroke-red-600" : "stroke-red-200"} hover:stroke-red-400 stroke-[10px]`} />
        <line x1={x2} y1={y3} x2={x2} y2={y1} onClick={handleClick} data-tuscii={4} strokeLinecap="round" className={`${tuscii & 4 ? "stroke-red-600" : "stroke-red-200"} hover:stroke-red-400 stroke-[10px]`}/>
        <line x1={x2} y1={y3} x2={x1} y2={y2} onClick={handleClick} data-tuscii={8} strokeLinecap="round" className={`${tuscii & 8 ? "stroke-red-600" : "stroke-red-200"} hover:stroke-red-400 stroke-[10px]`}/>
        <line x1={x2} y1={y4} x2={x1} y2={y5} onClick={handleClick} data-tuscii={16} strokeLinecap="round" className={`${tuscii & 16 ? "stroke-red-600" : "stroke-red-200"} hover:stroke-red-400 stroke-[10px]`}/>
        <line x1={x2} y1={y4} x2={x2} y2={y6} onClick={handleClick} data-tuscii={32} strokeLinecap="round" className={`${tuscii & 32 ? "stroke-red-600" : "stroke-red-200"} hover:stroke-red-400 stroke-[10px]`}/>
        <line x1={x2} y1={y4} x2={x3} y2={y5} onClick={handleClick} data-tuscii={64} strokeLinecap="round" className={`${tuscii & 64 ? "stroke-red-600" : "stroke-red-200"} hover:stroke-red-400 stroke-[10px]`}/>

        {/* vowel lines */}
        <line x1={x2} y1={y1} x2={x3} y2={y2} onClick={handleClick} data-tuscii={128} strokeLinecap="round" className={`${tuscii & 128 ? "stroke-blue-600" : "stroke-blue-200"} hover:stroke-blue-400 stroke-[10px]`}/>
        <line x1={x1} y1={y2} x2={x2} y2={y1} onClick={handleClick} data-tuscii={256} strokeLinecap="round" className={`${tuscii & 256 ? "stroke-blue-600" : "stroke-blue-200"} hover:stroke-blue-400 stroke-[10px]`}/>
        <line x1={x1} y1={y2} x2={x1} y2={y5} onClick={handleClick} data-tuscii={512} strokeLinecap="round" className={`${tuscii & 512 ? "stroke-blue-600" : "stroke-blue-200"} hover:stroke-blue-400 stroke-[10px]`}/>
        <line x1={x1} y1={y5} x2={x2} y2={y6} onClick={handleClick} data-tuscii={1024} strokeLinecap="round" className={`${tuscii & 1024 ? "stroke-blue-600" : "stroke-blue-200"} hover:stroke-blue-400 stroke-[10px]`}/>
        <line x1={x3} y1={y5} x2={x2} y2={y6} onClick={handleClick} data-tuscii={2048} strokeLinecap="round" className={`${tuscii & 2048 ? "stroke-blue-600" : "stroke-blue-200"} hover:stroke-blue-400 stroke-[10px]`}/>
        <circle cx={x2} cy={y7} r={10} fill="none" onClick={handleClick} data-tuscii={1} className={`${tuscii & 1 ? "stroke-green-600" : "stroke-green-200"} hover:stroke-green-400 stroke-[10px]`}/>
      </svg>
    </div>
  )
}

export default CharacterCanvas