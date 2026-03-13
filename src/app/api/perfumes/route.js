import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// This tells Next.js exactly where your data.json file lives
const dataFilePath = path.join(process.cwd(), 'data.json');

// 1. GET: Read from the JSON file
export async function GET() {
  try {
    // Read the file from your hard drive
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    
    // Convert the text into a JavaScript array
    const perfumes = JSON.parse(fileContents);
    
    // Send it to the frontend!
    return NextResponse.json(perfumes, { status: 200 });
  } catch (error) {
    console.error("Failed to read data:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array if file is missing
  }
}

// 2. POST: Write to the JSON file (For when you add new perfumes later!)
export async function POST(request) {
  try {
    const newPerfume = await request.json();
    
    // Read the existing perfumes
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const perfumes = JSON.parse(fileContents);
    
    // Give the new perfume a unique ID and add it to the array
    newPerfume.id = Date.now();
    perfumes.push(newPerfume);
    
    // Save the updated array back into the data.json file
    await fs.writeFile(dataFilePath, JSON.stringify(perfumes, null, 2));
    
    return NextResponse.json(newPerfume, { status: 201 });
  } catch (error) {
    console.error("Failed to save data:", error);
    return NextResponse.json({ error: 'Failed to save perfume' }, { status: 500 });
  }
}