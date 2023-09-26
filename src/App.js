import { useEffect, useState } from "react";
import "./App.css";

const drumPads = [
  {
    keyCode: 81,
    text: "Q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyCode: 87,
    text: "W",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyCode: 69,
    text: "E",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyCode: 65,
    text: "A",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyCode: 83,
    text: "S",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyCode: 68,
    text: "D",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open-HH",
  },
  {
    keyCode: 90,
    text: "Z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick-n'-Hat",
  },
  {
    keyCode: 88,
    text: "X",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyCode: 67,
    text: "C",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed-HH",
  },
];

const drumPads2 = [
  {
    keyCode: 81,
    text: "Q",
    description: "Chord-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    text: "W",
    description: "Chord-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    text: "E",
    description: "Chord-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    text: "A",
    description: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    text: "S",
    description: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    text: "D",
    description: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    text: "Z",
    description: "Punchy-Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    text: "X",
    description: "Side-Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    text: "C",
    description: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [pressKey, setPressKey] = useState("Click a Button");
  const [isActiveButton, setIsActiveButton] = useState(null);
  const [activeAudioBank, setActiveAudioBank] = useState(false);

  const currentAudioBank = activeAudioBank ? drumPads2 : drumPads;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyRelease);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyRelease);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      const drumPadKey = currentAudioBank.find(
        (letter) => letter.text === e.key.toUpperCase()
      );
      if (drumPadKey) {
        activateSound(drumPadKey.text);
        setPressKey(drumPadKey.description);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function activateSound(selector) {
    const audio = document.getElementById(selector);
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          audio.play();
        })
        .catch((e) => {
          audio.pause();
        });
    }
  }

  function handleClick(selector) {
    setPressKey(selector);
  }

  function handleKeyDown(e) {
    const drumPadKey = currentAudioBank.find(
      (letter) => letter.text === e.key.toUpperCase()
    );
    if (drumPadKey) {
      setIsActiveButton(drumPadKey.text);
    }
  }

  function handleKeyRelease() {
    setIsActiveButton(null);
  }

  function ToggleAudioBank() {
    setActiveAudioBank(!activeAudioBank);
  }

  return (
    <div className="App">
      <div id="drum-machine">
        <div className="drum-pads">
          {currentAudioBank.map((drumPad) => (
            <div
              key={drumPad.src}
              onClick={() => {
                activateSound(drumPad.text);
                handleClick(drumPad.description);
              }}
              className={`drum-pad ${
                isActiveButton === drumPad.text ? "active" : ""
              }`}
              id={drumPad.src}
            >
              {drumPad.text}
              <audio
                preload="auto"
                className="clip"
                id={drumPad.text}
                src={drumPad.src}
              ></audio>
            </div>
          ))}
        </div>
        <div id="display">
          <div className="bank">
            <p>Switch Audio Bank</p>
            <label className="switch">
              <input type="checkbox" id="slider" onChange={ToggleAudioBank} />
              <span className="slider"></span>
            </label>
          </div>
          <div> </div>
          <div className="display-text">{pressKey}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
