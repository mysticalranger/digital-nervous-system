import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2, 
  User, 
  MapPin, 
  Languages,
  Brain,
  Heart,
  Sparkles
} from 'lucide-react';

interface VoiceAssistant {
  id: 'arjun' | 'priya' | 'raj' | 'devi';
  name: string;
  city: string;
  personality: string;
  languageStrengths: string[];
  culturalExpertise: string[];
  voiceStyle: string;
  avatar: string;
  background: string;
}

interface VoiceMessage {
  id: string;
  transcript: string;
  analysis: {
    culturalScore: number;
    sentiment: string;
    language: string;
    insights: string[];
  };
  assistantResponse: {
    text: string;
    audioUrl?: string;
  };
  timestamp: Date;
}

const VoiceAssistantPage = () => {
  const [selectedAssistant, setSelectedAssistant] = useState<'arjun' | 'priya' | 'raj' | 'devi'>('arjun');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const assistants: VoiceAssistant[] = [
    {
      id: 'arjun',
      name: 'Arjun',
      city: 'Delhi',
      personality: 'Confident and street-smart',
      languageStrengths: ['Hindi', 'English', 'Punjabi'],
      culturalExpertise: ['North Indian Culture', 'Business Context', 'Politics'],
      voiceStyle: 'Casual & Friendly',
      avatar: '👨‍💼',
      background: 'from-red-100 to-orange-100'
    },
    {
      id: 'priya',
      name: 'Priya',
      city: 'Chennai',
      personality: 'Warm and traditional',
      languageStrengths: ['Tamil', 'English', 'Telugu'],
      culturalExpertise: ['South Indian Culture', 'Arts & Music', 'Festivals'],
      voiceStyle: 'Formal & Respectful',
      avatar: '👩‍🎨',
      background: 'from-green-100 to-teal-100'
    },
    {
      id: 'raj',
      name: 'Raj',
      city: 'Mumbai',
      personality: 'Fast-paced and ambitious',
      languageStrengths: ['Marathi', 'Hindi', 'English'],
      culturalExpertise: ['Business Culture', 'Entertainment', 'Urban Trends'],
      voiceStyle: 'Professional & Dynamic',
      avatar: '👨‍💰',
      background: 'from-blue-100 to-purple-100'
    },
    {
      id: 'devi',
      name: 'Devi',
      city: 'Bengaluru',
      personality: 'Tech-savvy and analytical',
      languageStrengths: ['Kannada', 'English', 'Tamil'],
      culturalExpertise: ['Tech Culture', 'Innovation', 'Youth Trends'],
      voiceStyle: 'Modern & Precise',
      avatar: '👩‍💻',
      background: 'from-purple-100 to-pink-100'
    }
  ];

  const currentAssistant = assistants.find(a => a.id === selectedAssistant) || assistants[0];

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processAudioMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const processAudioMessage = async (audioBlob: Blob) => {
    // Mock processing - in real implementation, send to speech-to-text service
    const mockTranscript = "Yaar, is Diwali season mein mera business kaisa perform karega?";
    
    const mockAnalysis = {
      culturalScore: 92,
      sentiment: 'positive',
      language: 'Hinglish',
      insights: [
        'Strong cultural context with festival reference',
        'Business concern during festive season',
        'North Indian linguistic patterns detected',
        'Optimistic tone with underlying concern'
      ]
    };

    const mockResponse = {
      text: `Arjun here! I can sense your excitement about Diwali business prospects. Based on your Hinglish expression, you're likely targeting the North Indian market. Festival seasons typically see 40-60% increase in consumer spending, especially in categories like gifts, sweets, and electronics. Your cultural alignment score is 92/100 - excellent for this demographic!`,
      audioUrl: undefined // In real implementation, generate TTS audio
    };

    const newMessage: VoiceMessage = {
      id: Date.now().toString(),
      transcript: mockTranscript,
      analysis: mockAnalysis,
      assistantResponse: mockResponse,
      timestamp: new Date()
    };

    setMessages(prev => [newMessage, ...prev]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Voice Cultural Assistants
          </h1>
          <p className="text-gray-600">
            Speak naturally in any Indian language and get cultural insights from regional experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assistant Selection */}
          <div className="lg:col-span-1">
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle>Choose Your Assistant</CardTitle>
                <CardDescription>Each assistant specializes in different regions and cultures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assistants.map((assistant) => (
                    <motion.div
                      key={assistant.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAssistant === assistant.id
                          ? 'border-orange-300 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-orange-200'
                      }`}
                      onClick={() => setSelectedAssistant(assistant.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">{assistant.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{assistant.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            {assistant.city}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{assistant.personality}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                            <Languages className="h-3 w-3" />
                            Languages
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {assistant.languageStrengths.map(lang => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                            <Brain className="h-3 w-3" />
                            Expertise
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {assistant.culturalExpertise.slice(0, 2).map(expertise => (
                              <Badge key={expertise} variant="outline" className="text-xs">
                                {expertise}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Assistant Card */}
            <Card className={`border-orange-200 bg-gradient-to-br ${currentAssistant.background} backdrop-blur-sm`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{currentAssistant.avatar}</div>
                  <div>
                    <CardTitle>{currentAssistant.name}</CardTitle>
                    <CardDescription className="text-gray-700">
                      Ready to help with {currentAssistant.city} cultural insights
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Style:</span>
                    <span>{currentAssistant.voiceStyle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Specialty:</span>
                    <span>{currentAssistant.culturalExpertise[0]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recording and Conversation */}
          <div className="lg:col-span-2">
            {/* Recording Interface */}
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle>Voice Analysis</CardTitle>
                <CardDescription>
                  Speak in any language - {currentAssistant.name} will provide cultural context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  <motion.div
                    className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 shadow-lg' 
                        : 'bg-orange-500 hover:bg-orange-600 shadow-md'
                    }`}
                    onClick={isRecording ? stopRecording : startRecording}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                    transition={isRecording ? { repeat: Infinity, duration: 1 } : {}}
                  >
                    {isRecording ? (
                      <MicOff className="h-12 w-12 text-white" />
                    ) : (
                      <Mic className="h-12 w-12 text-white" />
                    )}
                  </motion.div>
                  
                  <div className="text-center">
                    {isRecording ? (
                      <div>
                        <p className="text-lg font-semibold text-red-600">Recording...</p>
                        <p className="text-sm text-gray-600">{formatTime(recordingTime)}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to stop</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-semibold text-gray-700">Ready to Listen</p>
                        <p className="text-sm text-gray-600">Click to start recording</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation History */}
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Conversation History</CardTitle>
                <CardDescription>Your cultural analysis conversations</CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Mic className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Start a conversation to see your cultural analysis</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="border border-gray-200 rounded-lg p-4 bg-white"
                        >
                          {/* User Message */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-gray-900">You said:</span>
                              <Badge variant="outline" className="text-xs">
                                {message.analysis.language}
                              </Badge>
                            </div>
                            <p className="text-gray-700 italic">"{message.transcript}"</p>
                          </div>

                          {/* Analysis */}
                          <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="h-4 w-4 text-orange-600" />
                              <span className="font-medium text-orange-900">Cultural Analysis:</span>
                              <Badge variant="secondary">
                                {message.analysis.culturalScore}/100
                              </Badge>
                              <Badge variant={
                                message.analysis.sentiment === 'positive' ? 'default' : 
                                message.analysis.sentiment === 'negative' ? 'destructive' : 'secondary'
                              }>
                                {message.analysis.sentiment}
                              </Badge>
                            </div>
                            <ul className="text-sm text-orange-800 space-y-1">
                              {message.analysis.insights.map((insight, index) => (
                                <li key={index}>• {insight}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Assistant Response */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-lg">{currentAssistant.avatar}</div>
                              <span className="font-medium text-gray-900">{currentAssistant.name} responds:</span>
                              {message.assistantResponse.audioUrl && (
                                <Button size="sm" variant="outline" className="ml-auto">
                                  <Volume2 className="h-3 w-3 mr-1" />
                                  Play
                                </Button>
                              )}
                            </div>
                            <p className="text-gray-700">{message.assistantResponse.text}</p>
                          </div>

                          <div className="text-xs text-gray-500 mt-3">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;