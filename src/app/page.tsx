"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import SoundButton from "./sound";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
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
import { app, db } from "./firebase"
import { collection, DocumentData, getDocs } from "firebase/firestore";

export default function Home() {
  const [sounds, setSounds] = useState<{label: string, audioUrl: string}[]>([]);

  useEffect(() => {
    getDocs(collection(db, "sounds"))
    .then((querySnapshot) => {
      const data: any[] = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data
    })
    .then((data) => setSounds(data) )
    .catch((error) => {
      console.log("Error getting documents: ", error);
    })
    
    console.log(sounds)
  },[])

  return (
    <div className="grid items-center justify-items-center min-h-screen max-h-screen h-full overflow-hidden p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <main className="flex flex-col gap-14 row-start-2 items-center">
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl self-start">
          Komo <br/> Soundboard
        </h1>
        <div className="flex flex-col gap-8">
           <div className="grid grid-cols-2  gap-4 row-start-2">
              {sounds.map((sound, index) => (
                  <SoundButton
                    key={index}
                    label={sound.label}
                    soundSrc={sound.audioUrl}
                  />
                ))}
            </div>
            <div className="flex self-center">
                <Dialog >
              <DialogTrigger asChild>
                <Button className="w-32 h-10">Add Sound</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[80%] xxs:max-w-[375px]">
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
        </div>
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://en.wikipedia.org/wiki/Ghali_(rapper)"
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
          href="https://github.com/aluxf/komo-soundboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon width={20} height={20} />
          
          
          Repository
        </a>

      </footer>
    </div>
  );
}
