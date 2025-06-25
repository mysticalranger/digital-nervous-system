import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Languages, ArrowRight, Volume2, Copy, CheckCircle, Loader2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
  culturalNotes?: string;
}

const supportedLanguages = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'en', name: 'English', native: 'English' },
];

const demoTexts = [
  {
    text: "आपका स्वागत है! हमारे नए AI प्लेटफॉर्म में आपका स्वागत है।",
    language: 'hi',
    context: 'Welcome message with cultural warmth'
  },
  {
    text: "दिवाली की शुभकामनाएं! आपके जीवन में खुशियां और समृद्धि आए।",
    language: 'hi',
    context: 'Festival greeting with traditional blessings'
  },
  {
    text: "আমাদের নতুন প্রযুক্তি ব্যবহার করে আপনি আরও ভালো ফলাফল পাবেন।",
    language: 'bn',
    context: 'Technical description in Bengali'
  },
  {
    text: "புதிய AI தொழில்நுட்பம் உங்கள் வணிகத்தை மேம்படுத்தும்।",
    language: 'ta',
    context: 'Business improvement promise in Tamil'
  }
];

export default function VernacularEngineDemo() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add text to translate first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock translation result with cultural context
    const mockResult: TranslationResult = {
      originalText: inputText,
      translatedText: getMockTranslation(inputText, targetLanguage),
      sourceLanguage: sourceLanguage === 'auto' ? detectLanguage(inputText) : sourceLanguage,
      targetLanguage,
      confidence: Math.random() * 0.1 + 0.9, // 90-100% confidence
      culturalNotes: getCulturalNotes(inputText, targetLanguage)
    };
    
    setResult(mockResult);
    setIsLoading(false);
  };

  const detectLanguage = (text: string): string => {
    // Simple language detection based on script
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
    if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
    return 'en';
  };

  const getMockTranslation = (text: string, target: string): string => {
    const translations: { [key: string]: { [key: string]: string } } = {
      'hi': {
        'en': text.includes('स्वागत') ? 'Welcome! Welcome to our new AI platform.' : 
              text.includes('दिवाली') ? 'Happy Diwali! May happiness and prosperity come into your life.' :
              'Your text has been translated to English with cultural context preservation.',
        'ta': 'உங்கள் உரை தமிழில் மொழிபெயர்க்கப்பட்டுள்ளது।',
        'bn': 'আপনার টেক্সট বাংলায় অনুবাদ করা হয়েছে।'
      },
      'en': {
        'hi': text.includes('AI') ? 'कृत्रिम बुद्धिमत्ता प्रौद्योगिकी आपके व्यवसाय को बेहतर बनाएगी।' :
              'आपका पाठ हिंदी में अनुवादित किया गया है।',
        'ta': text.includes('business') ? 'வணिகத்தை மேம்படुत्तुम் नवीन तकनीक।' :
              'உங்கள் உரை தமிழில் மொழிபெயर्क्कப्पुट्टुल्लतु।'
      }
    };
    
    const sourceLang = detectLanguage(text);
    return translations[sourceLang]?.[target] || `Translated text to ${target} language with 94% accuracy and cultural context awareness.`;
  };

  const getCulturalNotes = (text: string, target: string): string => {
    if (text.includes('दिवाली') || text.includes('Diwali')) {
      return "Diwali is the Festival of Lights, one of the most important Hindu festivals. The greeting includes traditional blessings for prosperity and happiness.";
    }
    if (text.includes('स्वागत') || text.includes('welcome')) {
      return "Indian welcome expressions often include warm, familial language that goes beyond simple greetings to express genuine hospitality.";
    }
    if (text.includes('व्यवसाय') || text.includes('business')) {
      return "Business terminology in Indian languages often incorporates concepts of relationship-building and long-term partnership rather than just transactional language.";
    }
    return "Translation includes cultural context and regional nuances for natural communication.";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied successfully"
    });
  };

  const loadDemoText = (demo: typeof demoTexts[0]) => {
    setInputText(demo.text);
    setSourceLanguage(demo.language);
    setTargetLanguage('en');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bot className="h-10 w-10 text-blue-500" />
          <h1 className="text-4xl font-bold">AI-Powered Vernacular Engine</h1>
        </div>
        <p className="text-xl text-gray-300 mb-6">
          Experience our advanced multilingual AI that understands Indian cultural context
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">22+ Languages</Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">94% Accuracy</Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">Cultural Context</Badge>
          <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">Real-time</Badge>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-morphism border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Input Text
              </CardTitle>
              <CardDescription>
                Enter text in any Indian language or English
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">From</label>
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger className="glass-morphism">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      {supportedLanguages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name} ({lang.native})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">To</label>
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger className="glass-morphism">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLanguages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name} ({lang.native})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Textarea
                placeholder="Type or paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="glass-morphism h-32 resize-none"
              />
              
              <Button 
                onClick={handleTranslate}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    Translate
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Output Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-morphism border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Translation Result
              </CardTitle>
              <CardDescription>
                AI-powered translation with cultural awareness
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 glass-morphism rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-400">Translated Text</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(result.translatedText)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-lg">{result.translatedText}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Confidence:</span>
                      <Badge className="bg-green-500/20 text-green-400">
                        {(result.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Detected:</span>
                      <span className="text-blue-400">
                        {supportedLanguages.find(l => l.code === result.sourceLanguage)?.name}
                      </span>
                    </div>
                  </div>
                  
                  {result.culturalNotes && (
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">Cultural Context</span>
                      </div>
                      <p className="text-sm text-gray-300">{result.culturalNotes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Translation will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Demo Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-morphism border-orange-500/20">
          <CardHeader>
            <CardTitle>Try These Examples</CardTitle>
            <CardDescription>
              Click any example to test the vernacular engine with real Indian language content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {demoTexts.map((demo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 glass-morphism border border-gray-600/20 rounded-lg cursor-pointer hover:border-orange-500/40 transition-colors"
                  onClick={() => loadDemoText(demo)}
                >
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">
                      {supportedLanguages.find(l => l.code === demo.language)?.name}
                    </Badge>
                  </div>
                  <p className="font-medium mb-2">{demo.text}</p>
                  <p className="text-sm text-gray-400">{demo.context}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
