import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. The Admin Credentials
    if (email === "admin@aura.com" && password === "admin123") {
      return NextResponse.json({ 
        user: { name: "Admin", role: "ADMIN", email }
      }, { status: 200 });
    } 
    
    // 2. The Standard User Credentials
    if (email === "het@gmail.com" && password === "password123") {
      return NextResponse.json({ 
        user: { name: "Het", role: "USER", email }
      }, { status: 200 });
    }

    // 3. If neither match, reject the login
    return NextResponse.json(
      { message: "Invalid email or password" }, 
      { status: 401 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: "Server error during login" }, 
      { status: 500 }
    );
  }
}