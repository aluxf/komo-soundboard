import nodemailer from "nodemailer";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { db, storage } from "@/app/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest, context: any) {

    const formData = await req.formData();
    const label = formData.get("label") as string;
    const file = formData.get("file") as File;


    if (file === null || label === null) {
        return NextResponse.json(
            { message: "Invalid request" },
            { status: 400 });
    }
    const filename = label.replaceAll(" ", "_") + ".mp3"
    const storageRef = ref(storage, `sounds/${filename}`)
    
    const cloudFileRef = await uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log('Uploaded a blob or file!');
        return snapshot.ref
    });

    const cloudFileUrl = await getDownloadURL(cloudFileRef);
    const cloudFilePath = cloudFileRef.fullPath
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_ADMIN,
        subject: "New Sound Request",
        html: `
        <p>A new sound has been requested:</p>
        <p>Label: ${label}</p>
        <p><a href="${process.env.BASE_URL}/api/accept-sound?cloudFilePath=${cloudFilePath}&label=${label}&accept=true">Accept</a></p>
        <p><a href="${process.env.BASE_URL}/api/accept-sound?cloudFilePath=${cloudFilePath}&label=${label}accept=false">Reject</a></p>
        </br>
        </br>
        <a href="${cloudFileUrl}">Listen to Sound</a>
        <p>Do not reply to this email.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json(
            { message: "Request sent successfully" },
            { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Failed to send request" },
            { status: 500 });
    }
  }