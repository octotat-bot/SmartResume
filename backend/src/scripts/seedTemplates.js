// Simplified Seed Templates Script
// Run: npm run seed:templates

import mongoose from 'mongoose';
import Template from '../models/Template.js';
import dotenv from 'dotenv';

dotenv.config();

const templates = [
    {
        name: 'Classic Serif',
        description: 'Traditional resume template with serif fonts, perfect for corporate and formal positions. Clean, professional layout with clear section divisions.',
        category: 'classic',
        isPremium: false,
        isPublic: true,
        rating: 4.7,
        usageCount: 245,
        tags: ['ATS-Friendly', 'Professional', 'Traditional', 'Corporate']
    },
    {
        name: 'Modern Bold',
        description: 'Contemporary two-column resume with bold typography and clean lines. Ideal for creative and tech professionals who want to stand out.',
        category: 'modern',
        isPremium: false,
        isPublic: true,
        rating: 4.9,
        usageCount: 512,
        tags: ['Modern', 'Two-Column', 'Bold', 'Tech', 'Creative']
    },
    {
        name: 'Minimalist Clean',
        description: 'Ultra-clean minimalist design with ample white space. Perfect for designers, architects, and creative professionals.',
        category: 'minimal',
        isPremium: true,
        isPublic: true,
        rating: 4.8,
        usageCount: 189,
        tags: ['Minimalist', 'Clean', 'White Space', 'Designer', 'ATS-Friendly']
    },
    {
        name: 'Tech Professional',
        description: 'Designed specifically for software engineers and tech professionals. Optimized for ATS systems with clear technical skills section.',
        category: 'technical',
        isPremium: false,
        isPublic: true,
        rating: 4.6,
        usageCount: 387,
        tags: ['ATS-Optimized', 'Technical', 'Software Engineer', 'IT', 'Developer']
    },
    {
        name: 'Creative Portfolio',
        description: 'Eye-catching design for creative professionals. Features bold colors and unique layout to showcase your personality.',
        category: 'creative',
        isPremium: true,
        isPublic: true,
        rating: 4.5,
        usageCount: 156,
        tags: ['Creative', 'Colorful', 'Unique', 'Portfolio', 'Designer']
    },
    {
        name: 'Executive Modern',
        description: 'Sophisticated template for senior executives and C-level professionals. Elegant design with emphasis on achievements.',
        category: 'professional',
        isPremium: true,
        isPublic: true,
        rating: 4.9,
        usageCount: 98,
        tags: ['Executive', 'Senior', 'Professional', 'C-Level', 'Leadership']
    }
];

async function seedTemplates() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing templates
        await Template.deleteMany({});
        console.log('🗑️  Cleared existing templates');

        // Insert new templates
        const result = await Template.insertMany(templates);
        console.log(`✅ Successfully seeded ${result.length} templates`);

        // Display summary
        console.log('\n📊 Templates Summary:');
        result.forEach((t, i) => {
            console.log(`${i + 1}. ${t.name} (${t.category}) - ${t.isPremium ? '👑 Premium' : '🆓 Free'} - ⭐ ${t.rating}`);
        });

        console.log('\n🎉 Templates are now available on /templates page!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding templates:', error);
        process.exit(1);
    }
}

seedTemplates();
