"use client"
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SoundButton from "./sound";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { SoundForm } from "./form";

export default function Home() {
  const [sounds, setSounds] = useState<{label:string, filename:string}[]>([]);
  useEffect(() => {
    fetch("/sounds.json")
      .then((response) => response.json())
      .then((data) => setSounds(data));
  }, []);


  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex gap-6 items-end justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Soundboard
        </h1>
      </header>
      <main className="flex flex-col gap-11 row-start-2 items-center">
        
        <div className="grid grid-cols-3 gap-4 row-start-2">
          {sounds.map((sound, index) => (
              <SoundButton
                key={index}
                label={sound.label}
                soundSrc={`/sounds/${sound.filename}`}
              />
            ))}
        </div>
        <div className="flex self-center">
            <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Sound</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Sound</DialogTitle>
              <DialogDescription>
                Here you can request to add a new sound.
              </DialogDescription>
            </DialogHeader>
              <SoundForm />
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
