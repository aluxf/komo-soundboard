import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { db, storage } from "@/app/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes,deleteObject , getDownloadURL} from "firebase/storage";


export async function GET(req: NextRequest) {

    const cloudFilePath = req.nextUrl.searchParams.get("cloudFilePath");
    const label = req.nextUrl.searchParams.get("label");
    const accept = req.nextUrl.searchParams.get("accept");

    if (cloudFilePath === null || accept === null || label === null) {
        return NextResponse.json(
            { message: "Invalid request" },
            { status: 400 });
    }

    const cloudFileRef = ref(storage, cloudFilePath)
    const cloudFileUrl = await getDownloadURL(cloudFileRef)
    .then(url => {
      return Promise.resolve(url);
    })
    .catch(_ => {
        return Promise.resolve(null);
    });
    
    // check if exists
    if (!cloudFileUrl) {
        return NextResponse.json(
            { message: "This sound request has already been handled." },
            { status: 404 });
    }

    if (accept == "true") {
        await addDoc(collection(db, "sounds"), { 
            label: label,
            audioUrl: cloudFileUrl,
        });

        return NextResponse.json({ message: "Sound accepted."}, { status: 200 });
    }
    deleteObject(cloudFileRef)
    return NextResponse.json({ message: "Sound rejected."}, { status: 200 });
  }