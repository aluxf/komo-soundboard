"use client"
import React from "react";
import useSound from "use-sound";

const SoundButton= ({ label, soundSrc }: { label: string, soundSrc: string }) => {
  const [play] = useSound(soundSrc);
  return (
    <div className="sound-button">
      <button onClick={() => play()} className="btn">
        {label}
      </button>
    </div>
  );
};

export default SoundButton;