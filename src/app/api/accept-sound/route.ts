import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"

export const config = {
    api: {
      bodyParser: false
    }
}

export async function GET(req: NextRequest) {

    const filename = req.nextUrl.searchParams.get("filename");
    const accept = req.nextUrl.searchParams.get("accept");

    if (filename === null || accept === null) {
        return NextResponse.json(
            { message: "Invalid request" },
            { status: 400 });
    }

    const tempDir = "public/sounds/temp";
    const soundsDir = "public/sounds";
    const tempFilePath = path.join(tempDir, filename);
    const soundFilePath = path.join(soundsDir, filename);
    if (!fs.existsSync(tempFilePath)) {
        return NextResponse.json(
            { message: "This sound request has already handled." },
            { status: 404 });
    }

    // Move the file to the sounds directory
    if (accept == "true") {
        fs.copyFileSync(tempFilePath, soundFilePath);
        fs.rmSync(tempFilePath);
        return NextResponse.json({ message: "Sound accepted."}, { status: 200 });
    }
    return NextResponse.json({ message: "Sound rejected."}, { status: 200 });
  }