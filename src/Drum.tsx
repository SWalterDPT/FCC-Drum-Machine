import { useEffect, useState } from "react";
import { AudioClip } from "./types";
import { audioClips } from "./audioClipsOne";
import { audioClipsTwo } from "./audioClipsTwo";

interface DrumProps {
  audioClip: AudioClip;
  isPowerOn: boolean;
  bankSelection: boolean;
  handleDisplay: (value: string) => void;
}

const Drum = ({ audioClip, isPowerOn, bankSelection, handleDisplay }: DrumProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedAudioClips, setSelectedAudioClips] = useState<AudioClip[]>(audioClips);

  const handlePress = (event: KeyboardEvent) => {
    if (audioClip.keyTrigger === event.key.toUpperCase()) {
      if (isPowerOn) {
        const selectedClip = selectedAudioClips.find((clip) => clip.keyTrigger === event.key.toUpperCase());

        if (selectedClip) {
          let buttonClicked = document.getElementById(selectedClip.keyTrigger) as HTMLButtonElement;
          buttonClicked?.click();
          setIsActive(true);
        }
      }
    }
  };

  const handleClick = () => {
    if (isPowerOn) {
      const selectedClip = selectedAudioClips.find((clip) => clip.keyTrigger === audioClip.keyTrigger);
  
      if (selectedClip) {
        const audioElement = document.getElementById(selectedClip.keyTrigger) as HTMLAudioElement;
  
        if (audioElement) {
          audioElement.volume = 1;
          audioElement.play();
          audioElement.currentTime = 0;
          handleDisplay(selectedClip.description);
        }
      }
    }
  };
  

  useEffect(() => {
    setSelectedAudioClips(bankSelection ? audioClipsTwo : audioClips);
  }, [bankSelection]);

  useEffect(() => {
    document.addEventListener("keydown", handlePress);
    return () => document.removeEventListener("keydown", handlePress);
  }, [isPowerOn, bankSelection]);

  return (
    <button className={`drum-pad ${isActive ? "active" : ""}`} id={`drum-${audioClip.keyTrigger}`} onClick={handleClick}>
      {audioClip.keyTrigger}
      {isPowerOn && (
        <audio src={selectedAudioClips.find(clip => clip.keyTrigger === audioClip.keyTrigger)?.audioSource} className="clip" id={audioClip.keyTrigger}></audio>
        )}
    </button>
  );
};

export default Drum;
