import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. MUST have an email and password typed in
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide an email and password." }, 
        { status: 400 }
      );
    }

    // 2. The Strict Admin Vault (Only works with exact match)
    if (email === "admin@aura.com" && password === "admin123") {
      return NextResponse.json({ 
        user: { name: "Admin", role: "ADMIN", email }
      }, { status: 200 });
    } 
    
    // 3. The Open Door for Everyone Else!
    // We grab the first part of their email to use as their Name (e.g., "het" from "het@gmail.com")
    const generatedName = email.split('@')[0];

    return NextResponse.json({ 
      user: { name: generatedName, role: "USER", email }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Server error during login" }, 
      { status: 500 }
    );
  }
}