import nodemailer from "nodemailer";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"

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

    const tempDir = path.join(process.cwd(), "public/sounds/temp") 
    const filename = label.replaceAll(" ", "_") + ".mp3"
    const tempFilePath = path.join(tempDir, filename);

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    // Save the file to the temp directory
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(tempFilePath, fileBuffer);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_ADMIN,
        subject: "New Sound Request",
        html: `
        <p>A new sound has been requested:</p>
        <p>Label: ${label}</p>
        <p><a href="${process.env.BASE_URL}/api/accept-sound?filename=${filename}&label=${label}&accept=true">Accept</a></p>
        <p><a href="${process.env.BASE_URL}/api/accept-sound?filename=${filename}&label=${label}accept=false">Reject</a></p>
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