import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"

export async function GET(req: NextRequest) {

    const filename = req.nextUrl.searchParams.get("filename");
    const label = req.nextUrl.searchParams.get("label");
    const accept = req.nextUrl.searchParams.get("accept");

    if (filename === null || accept === null || label === null) {
        return NextResponse.json(
            { message: "Invalid request" },
            { status: 400 });
    }

    const tempDir = path.join(process.cwd(), "public/sounds/temp");
    const soundsDir = path.join(process.cwd(), "public/sounds");
    const tempFilePath = path.join(tempDir, filename);
    const soundFilePath = path.join(soundsDir, filename);

    if (!fs.existsSync(tempFilePath)) {
        return NextResponse.json(
            { message: "This sound request has already been handled." },
            { status: 404 });
    }

    // Move the file to the sounds directory
    if (accept == "true") {
        fs.copyFileSync(tempFilePath, soundFilePath);
        fs.rmSync(tempFilePath);
        const soundsFilePath = "public/sounds.json"

        if (!fs.existsSync(soundsFilePath)) {
            fs.writeFileSync(soundsFilePath, JSON.stringify([{label , filename}], null, 2));
            return NextResponse.json({ message: "Sound accepted."}, { status: 200 });
        }

        const soundsFileContent = fs.readFileSync(soundsFilePath, "utf-8");
        const soundsData = JSON.parse(soundsFileContent);
        soundsData.push({ label, filename });
        fs.writeFileSync(soundsFilePath, JSON.stringify(soundsData, null, 2));

        return NextResponse.json({ message: "Sound accepted."}, { status: 200 });
    }
    return NextResponse.json({ message: "Sound rejected."}, { status: 200 });
  }