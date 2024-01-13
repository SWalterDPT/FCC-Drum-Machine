import React, { useState } from 'react';
import './App.css'
import Drum from './Drum'
import { audioClips } from './audioClipsOne'
import Switch from './Switch'


function App() {
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [audioBank] = useState(audioClips);
  const [isBankTwoSelected, setIsBankTwoSelected] = useState(false);

  const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(!isPowerOn) return;

    const clip = audioBank.find((clip) => clip.keyTrigger === e.key.toUpperCase());
    if (!clip) return;
    (document.getElementById(clip.keyTrigger) as HTMLAudioElement).play().catch(console.error);
    document.getElementById("drum-" + clip.keyTrigger)?.focus();
    document.getElementById("display")!.innerText = clip.description;
  };
  function handlePower(){
    setIsPowerOn(!isPowerOn);
  }
  function handleBank(){
    setIsBankTwoSelected(!isBankTwoSelected);
  }

  return (
    <div className="container" id="drum-machine" onKeyDown={playAudio}>
      <h1>FCC Drum Machine</h1>
      <div className="whole-drum">
        {audioBank.map((clip) => (
          <Drum
            audioClip={clip}
            key={clip.keyTrigger}
            isPowerOn={isPowerOn}
            bankSelection={isBankTwoSelected}
            handleDisplay={(value: string) => {
              document.getElementById("display")!.innerText = value;
            }}
          />
        ))}
      </div>
      <div id="display"></div>
      <div className='switch-container' id="switch-container">
        <div className='form-check form-switch power-switch'>
          <Switch name="power" title="Power" selection={isPowerOn} handleSwitch={handlePower} />
        </div>
        <div className='form-check form-switch bank-switch'>
          <Switch name="bankSelection" title="Bank" selection={isBankTwoSelected} handleSwitch={handleBank} />
        </div>
      </div>
    </div>
  )
}

export default App;
