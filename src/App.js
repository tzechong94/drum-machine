import './App.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

let sounds = [
  {key:'Q',
  idOne:'Heater-1',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    idTwo:'Chord-1',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
    {key:'W',
  idOne:'Heater-2',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    idTwo:'Chord-2',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
   { key:'E',
  idOne:'Heater-3',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    idTwo:'Chord-3',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'},
    {key:'A',
  idOne:'Heater-4',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    idTwo:'Shaker',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
    {key:'S',
  idOne:'Clap',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    idTwo:'Open-HH',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'},
    {key:'D',
  idOne:'Open-HH',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    idTwo:'Closed-HH',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'},
      {key:'Z',
  idOne:'Kick-n\'-Hat',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    idTwo:'Punchy-Kick',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'},
  {key:'X',
  idOne:'Kick',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    idTwo:'Side-Stick',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'},
    {key:'C',
  idOne:'Closed-HH',
  urlOne:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    idTwo:'Snare',
    urlTwo:'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'}]



function App() {
  const [ volume, setVolume ] = useState(50); 
  const [ powerbutton, setPowerbutton] = useState(true);
  const [ bankbutton, setBankbutton ] = useState(true);
  const [ message, setMessage ] = useState("Drum Machine");


  const onPowerButton = () => {
    setPowerbutton(current=> !current);
    powerbutton ? setMessage('Power off'): setMessage('Power on');
  }

  const onBankButton = () => {
    setBankbutton(current=> !current);
    !bankbutton ? setMessage('Bank A'): setMessage('Bank B');

  }


  // useEffect(()=>{
  //   console.log("power", powerbutton);
  //   console.log("bank", bankbutton);
  // },[bankbutton,powerbutton])

  function handleClick(event) {
    if(!powerbutton) {
      return
    } else {
      let value = event.target.innerHTML;
      let obj = sounds.filter(obj=> obj.key===value);
      let url = bankbutton ? obj[0].urlOne : obj[0].urlTwo;
      bankbutton ? setMessage(obj[0].idOne) : setMessage(obj[0].idTwo);
      let audio = new Audio(url);
      // console.log(url);
      audio.volume = volume/100;
      audio.play();
    }
  }

  let handleKeyPress = function(e, targetElem) {
    if (!powerbutton) {
      return;
    } else {
      for (let i=0; i<sounds.length;i++){
        let val = sounds[i].key;
        if (e.key.toUpperCase() === val) {
          let value = e.key.toUpperCase();
          let obj = sounds.filter(obj=> obj.key===value);
          let url = bankbutton ? obj[0].urlOne : obj[0].urlTwo;
          bankbutton ? setMessage(obj[0].idOne) : setMessage(obj[0].idTwo);
          let audio = new Audio(url);
          audio.volume = volume/100;
          audio.play();

        } else {
          continue;
        }
      }
    }
    }

return (
    <div className="App"  onKeyPress={handleKeyPress}>
      <h1 className='title'>Drum Machine</h1>
      <div className="card-container" tabIndex="0">
        <div className="padbank-container">
          {sounds.map(obj=>{
            let letter=obj.key;
            let url = bankbutton ? obj.urlOne : obj.urlTwo;
            let id = bankbutton ? obj.idOne : obj.idTwo;
            return (
              <div key={id}>
                  <button className='drum-key'
                  id={letter}
                  onClick={handleClick}
                  >{letter}</button>
                  <audio
                  id={letter}
                  className="clip"
                  src={url}></audio>
              </div>
                )
              }
              )
            }

        </div>
            
    
        <div className="controls-container">
            <div className="power"><strong>Power</strong></div>
              <BootstrapSwitchButton 
              checked={powerbutton} 
              onstyle="dark" 
              offstyle="outline-dark"
              onChange={onPowerButton}
              />
            <div className="display">
              <p className='display-field'>{message}</p>      
            </div>
            <div className="volume-slider">            
              <strong>Volume</strong>
            </div>
            <RangeSlider
            value={volume}
            variant='dark'
            onChange={changeEvent => setVolume(changeEvent.target.value)}/>

            <BootstrapSwitchButton 
            onlabel="Bank A" 
            offlabel="Bank B" 
            checked={bankbutton} 
            onstyle="dark"
            offstyle="dark"
            onChange={onBankButton} />
            </div>
        </div>
    </div>
  );
}

export default App;
