import { NextResponse } from 'next/server';

// Using the Next.js @ alias to jump straight to the files!
import connectToDatabase from '@/lib/mongodb';
import Perfume from '@/models/Perfume';

export async function GET() {
// ... keep the rest of your code exactly the same!
  try {
    await connectToDatabase();

    // 1. Optional: Clear the database first so we don't accidentally create duplicates if you click it twice
    await Perfume.deleteMany({});

    // 2. The data we want to inject into the cloud
    const initialPerfumes = [
      { 
        name: "Coco Noir Chanel", 
        price: 150, 
        stock: 12, 
        category: "Designer",
        image: "/image_1.png" // Reusing your beautiful hero image for now
      },
      { 
        name: "Ethereal Aura", 
        price: 185, 
        stock: 5, 
        category: "Signature",
        image: "/image_1.png" 
      },
      { 
        name: "Midnight Oud", 
        price: 210, 
        stock: 0, 
        category: "Luxury",
        image: "/image_1.png" 
      }
    ];

    // 3. Command Mongoose to insert the entire array at once
    await Perfume.insertMany(initialPerfumes);

    return NextResponse.json({ message: "Success! Database has been seeded with luxury perfumes." }, { status: 200 });

  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}