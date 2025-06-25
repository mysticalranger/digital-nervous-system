// Test Gemini Integration
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGeminiIntegration() {
  try {
    const gemini = new GoogleGenerativeAI('AIzaSyCQqU7bEPsXPGH58bllGXtgb9czpxgKIkA');
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Analyze this Hindi-English text for cultural sentiment: "Yaar this festival season is gonna be lit! Diwali vibes are already hitting different 🪔✨"`;
    
    console.log('🧪 Testing Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API Response:', text);
    console.log('🎉 Integration successful!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testGeminiIntegration();
