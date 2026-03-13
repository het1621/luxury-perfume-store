import mongoose from 'mongoose';

// 1. Define the Blueprint (Schema)
const perfumeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  image: { 
    type: String, 
    required: false 
  },
  category: { 
    type: String, 
    required: false 
  }
}, { 
  timestamps: true // This automatically adds "createdAt" and "updatedAt" dates!
});

// 2. The Next.js Hot-Reload Fix
// Next.js restarts the server often. This line prevents Mongoose from crashing 
// by checking if the model already exists before trying to build it again.
const Perfume = mongoose.models.Perfume || mongoose.model('Perfume', perfumeSchema);

export default Perfume;