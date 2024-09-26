"use client"
import React from "react";
import useSound from "use-sound";
import { Button } from "@/components/ui/button";

const SoundButton= ({ label, soundSrc }: { label: string, soundSrc: string }) => {
  const [play] = useSound(soundSrc);
  return (
    <Button className="overflow-hidden" onClick={() => play()} variant={"outline"}>
        <div className="max-w-full">
            {label}
        </div>
    </Button>
  );
};

export default SoundButton;