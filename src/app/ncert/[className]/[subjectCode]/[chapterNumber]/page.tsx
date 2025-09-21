"use client"

import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen, 
  Calculator, 
  Globe, 
  Atom, 
  History, 
  Languages, 
  Users, 
  Microscope,
  FlaskConical,
  MapPin,
  Brain,
  Star,
  Trophy,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  BookMarked,
  Zap,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Play,
  Clock,
  CheckCircle2,
  Lock,
  Crown,
  MessageSquare,
  Mic,
  FileText,
  BarChart3,
  Camera,
  Volume2,
  Download,
  Share2,
  Bookmark,
  Eye,
  PenTool,
  HelpCircle,
  // BookText and CircleHelp are not available in lucide-react
  // Using alternatives
  FileText as BookText,
  Headphones,
  HelpCircle as CircleHelp,
  SquareStack,
  ListChecks,
  Menu,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  PauseCircle,
  PlayCircle,
  X
} from 'lucide-react'
import { getCompleteChapterData } from '@/data/ncertDataIntegration'
import { useAuth } from '@/contexts/AuthContext'
import { LearningToolsProvider, AITutorChat, SnapSolve } from '@/components/learning-tools'

// Mock NCERT content
const MOCK_CHAPTER_CONTENT = `
# Food: Where Does It Come From?

## Introduction
Food is one of the basic requirements of all living organisms. All living organisms require food for growth, repair and functioning of the body. Organisms need energy to perform various activities. The energy is supplied by the food.

## Sources of Food
Different organisms use different food items. Plants are the only organisms that can prepare their food by the process of photosynthesis. All other organisms directly or indirectly depend on plants for food.

## Food Variety
Different regions of the world have different food habits. The main reason for this is the availability of different types of food in different parts of the world.

### Variety in Food
- In some regions of our country, rice is the staple food, and in others, it is wheat.
- People living in coastal areas consume more fish and other sea food.
- The staple food of one region may not be consumed much in other regions.

## Plant Parts as Food
We eat different parts of plants as food.
- **Fruits**: Mango, banana, apple, etc.
- **Vegetables**: Carrot, radish, onion, etc.
- **Cereals**: Wheat, rice, maize, etc.
- **Pulses**: Peas, gram, etc.

## Food from Animals
We get several food items from animals.
- **Milk and Milk Products**: Milk, curd, cheese, butter, etc.
- **Eggs**: From birds like hen, duck, etc.
- **Meat**: From animals like goat, sheep, etc.
- **Honey**: From beehives.

## Food Chain
The sequence of living organisms in a community in which one organism consumes another organism to transfer food energy is called a food chain.

### Food Chain Example
- Grass → Deer → Lion
- Plants → Herbivores → Carnivores

## Food Habits of Animals
Based on the food they eat, animals are classified into:
- **Herbivores**: Animals that eat only plants or plant products. Examples: Cow, goat, deer.
- **Carnivores**: Animals that eat only other animals. Examples: Lion, tiger, eagle.
- **Omnivores**: Animals that eat both plants and animals. Examples: Human, bear, crow.
- **Scavengers**: Animals that eat dead animals. Examples: Vulture, hyena.

## Conclusion
Food is essential for all living organisms. There is a lot of variety in food habits across different organisms and different regions of the world. Understanding where our food comes from helps us appreciate the interconnectedness of life on Earth.
`;

const MOCK_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Which of the following organisms can prepare their own food?',
    options: ['Plants', 'Animals', 'Fungi', 'Bacteria'],
    correctAnswer: 'Plants',
    explanation: 'Plants are the only organisms that can prepare their food by the process of photosynthesis. All other organisms directly or indirectly depend on plants for food.'
  },
  {
    id: 'q2',
    question: 'Animals that eat only plants are called:',
    options: ['Carnivores', 'Herbivores', 'Omnivores', 'Scavengers'],
    correctAnswer: 'Herbivores',
    explanation: 'Herbivores are animals that eat only plants or plant products. Examples include cow, goat, and deer.'
  },
  {
    id: 'q3',
    question: 'Which of the following is NOT a food item we get from animals?',
    options: ['Milk', 'Eggs', 'Wheat', 'Honey'],
    correctAnswer: 'Wheat',
    explanation: 'Wheat is a cereal grain that comes from plants, not animals. The other options (milk, eggs, honey) are all derived from animals.'
  },
  {
    id: 'q4',
    question: 'In a food chain, energy flows from:',
    options: ['Carnivores to Herbivores', 'Herbivores to Plants', 'Plants to Herbivores', 'All directions equally'],
    correctAnswer: 'Plants to Herbivores',
    explanation: 'In a food chain, energy flows from producers (plants) to primary consumers (herbivores) and then to secondary consumers (carnivores).'
  },
  {
    id: 'q5',
    question: 'Animals that eat both plants and animals are called:',
    options: ['Carnivores', 'Herbivores', 'Omnivores', 'Producers'],
    correctAnswer: 'Omnivores',
    explanation: 'Omnivores are animals that eat both plants and animals. Examples include humans, bears, and crows.'
  }
];

const MOCK_FLASHCARDS = [
  {
    id: 'f1',
    question: 'What are the main sources of food for all living organisms?',
    answer: 'Plants are the main source of food for all living organisms. They are the only organisms that can prepare their own food through photosynthesis.'
  },
  {
    id: 'f2',
    question: 'Name different parts of plants that we eat as food.',
    answer: 'We eat different parts of plants as food: Fruits (mango, banana), Vegetables (carrot, radish), Cereals (wheat, rice), and Pulses (peas, gram).'
  },
  {
    id: 'f3',
    question: 'What are herbivores?',
    answer: 'Herbivores are animals that eat only plants or plant products. Examples include cow, goat, and deer.'
  },
  {
    id: 'f4',
    question: 'What is a food chain?',
    answer: 'A food chain is the sequence of living organisms in a community in which one organism consumes another organism to transfer food energy.'
  },
  {
    id: 'f5',
    question: 'What food products do we get from animals?',
    answer: 'We get several food items from animals: Milk and milk products, Eggs, Meat, and Honey.'
  },
  {
    id: 'f6',
    question: 'What are carnivores?',
    answer: 'Carnivores are animals that eat only other animals. Examples include lion, tiger, and eagle.'
  },
  {
    id: 'f7',
    question: 'What are scavengers?',
    answer: 'Scavengers are animals that eat dead animals. Examples include vultures and hyenas.'
  },
  {
    id: 'f8',
    question: 'Give an example of a food chain.',
    answer: 'A simple food chain example is: Grass → Deer → Lion, or Plants → Herbivores → Carnivores.'
  }
];

export default function ChapterLearningPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  
  // Extract parameters
  const className = params.className as string
  const subjectCode = params.subjectCode as string
  const chapterNumber = params.chapterNumber as string
  
  // Handle both formats: "class-1" and "class1"
  let classNumber: number | null = null
  if (className) {
    if (className.includes('-')) {
      classNumber = parseInt(className.replace('class-', ''))
    } else {
      classNumber = parseInt(className.replace('class', ''))
    }
  }
  
  const chapterNum = chapterNumber ? parseInt(chapterNumber.replace('chapter-', '')) : null
  
  const [activeTab, setActiveTab] = useState('read')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioGenerating, setIsAudioGenerating] = useState(false)
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  
  const audioRef = useRef<HTMLAudioElement>(null)

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])
  
  if (!classNumber || !subjectCode || !chapterNum) {
    return <div>Invalid parameters</div>
  }
  
  // Get chapter data
  const chapterData = getCompleteChapterData(classNumber, subjectCode.toUpperCase(), `${subjectCode.toLowerCase()}-${classNumber}-ch${chapterNum}`)
  
  if (!chapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
          <p className="text-gray-600 mb-4">The requested chapter data is not available.</p>
          <Link href={`/ncert/${className}/${subjectCode}`}>
            <Button>Back to Subject</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Functions for the audio tab
  const generateAudio = () => {
    setIsAudioGenerating(true)
    // Simulate API call to OpenAI TTS
    setTimeout(() => {
      setIsAudioGenerating(false)
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 2000)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Functions for the flashcards tab
  const nextFlashcard = () => {
    setCurrentFlashcard((prev) => (prev + 1) % MOCK_FLASHCARDS.length)
    setShowFlashcardAnswer(false)
  }

  const prevFlashcard = () => {
    setCurrentFlashcard((prev) => (prev - 1 + MOCK_FLASHCARDS.length) % MOCK_FLASHCARDS.length)
    setShowFlashcardAnswer(false)
  }

  // Functions for the quiz tab
  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const submitQuiz = () => {
    setShowQuizResults(true)
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setShowQuizResults(false)
  }

  const getQuizScore = () => {
    let correct = 0
    MOCK_QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return {
      score: correct,
      total: MOCK_QUIZ_QUESTIONS.length,
      percentage: Math.round((correct / MOCK_QUIZ_QUESTIONS.length) * 100)
    }
  }

  // Toggle content sections
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Convert markdown to HTML (simplified)
  const renderMarkdown = (markdown: string) => {
    const sections = markdown.split('\n## ')
    
    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          if (index === 0) { // Title and introduction
            const [title, ...content] = section.split('\n')
            return (
              <div key="intro" className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title.replace('# ', '')}</h1>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  {content.join('\n').split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )
          } else {
            const [sectionTitle, ...sectionContent] = section.split('\n')
            const sectionId = `section-${index}`
            const isExpanded = expandedSections[sectionId] !== false // Default to expanded
            
            return (
              <div key={sectionId} className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <button
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-700"
                  onClick={() => toggleSection(sectionId)}
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{sectionTitle}</h2>
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    {sectionContent.join('\n').split('\n\n').map((content, i) => {
                      // Handle subsections
                      if (content.startsWith('### ')) {
                        const [subTitle, ...subContent] = content.split('\n')
                        return (
                          <div key={`sub-${i}`} className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{subTitle.replace('### ', '')}</h3>
                            {subContent.map((sc, sci) => {
                              // Handle lists
                              if (sc.startsWith('- ')) {
                                return (
                                  <ul key={`list-${sci}`} className="list-disc pl-6 space-y-1">
                                    {sc.split('\n- ').map((item, itemIndex) => (
                                      <li key={`item-${itemIndex}`} className="text-gray-700 dark:text-gray-300">
                                        {item.replace('- ', '')}
                                      </li>
                                    ))}
                                  </ul>
                                )
                              }
                              // Handle bold text
                              else if (sc.includes('**')) {
                                return (
                                  <p key={`p-${sci}`} className="text-gray-700 dark:text-gray-300">
                                    {sc.split('**').map((part, partIndex) => 
                                      partIndex % 2 === 0 ? part : <strong key={partIndex}>{part}</strong>
                                    )}
                                  </p>
                                )
                              }
                              // Regular paragraph
                              else {
                                return (
                                  <p key={`p-${sci}`} className="text-gray-700 dark:text-gray-300">{sc}</p>
                                )
                              }
                            })}
                          </div>
                        )
                      }
                      // Handle lists at section level
                      else if (content.startsWith('- ')) {
                        return (
                          <ul key={`list-${i}`} className="list-disc pl-6 space-y-1">
                            {content.split('\n- ').map((item, itemIndex) => (
                              <li key={`item-${itemIndex}`} className="text-gray-700 dark:text-gray-300">
                                {item.replace('- ', '')}
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      // Regular paragraph
                      else {
                        return (
                          <p key={`p-${i}`} className="text-gray-700 dark:text-gray-300">{content}</p>
                        )
                      }
                    })}
                  </div>
                )}
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {chapterData.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Chapter {chapterData.chapterNumber} • {chapterData.estimatedTime} min
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Share2 className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            <Bookmark className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            <Download 
              className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" 
              onClick={() => {
                // For now we'll use mock URL; in production this would point to actual NCERT PDFs
                const pdfUrl = `https://ncert.nic.in/textbook/pdf/${subjectCode.toLowerCase()}-${classNumber}-ch${chapterNum}.pdf`;
                window.open(pdfUrl, '_blank');
              }}
            />
          </div>
        </div>

        {/* Learning Mode Tabs */}
        <Tabs 
          defaultValue="read" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full mb-8"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <TabsTrigger 
              value="read" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <BookText className="w-4 h-4" />
              <span className="hidden md:inline">Read</span>
            </TabsTrigger>
            <TabsTrigger 
              value="listen" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <Headphones className="w-4 h-4" />
              <span className="hidden md:inline">Listen</span>
            </TabsTrigger>
            <TabsTrigger 
              value="quiz" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <Target className="w-4 h-4" />
              <span className="hidden md:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger 
              value="flashcards" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <SquareStack className="w-4 h-4" />
              <span className="hidden md:inline">Flashcards</span>
            </TabsTrigger>
            <TabsTrigger 
              value="summary" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline">Ask AI</span>
            </TabsTrigger>
          </TabsList>

          {/* Read Tab Content */}
          <TabsContent value="read" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                {renderMarkdown(MOCK_CHAPTER_CONTENT)}
              </CardContent>
            </Card>
            
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  const prevChapterNum = chapterNum - 1
                  if (prevChapterNum > 0) {
                    router.push(`/ncert/${className}/${subjectCode}/chapter-${prevChapterNum}`)
                  }
                }}
                disabled={chapterNum <= 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Chapter
              </Button>
              <Button
                className="flex items-center"
                onClick={() => {
                  setActiveTab('quiz')
                }}
              >
                <Target className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  const nextChapterNum = chapterNum + 1
                  router.push(`/ncert/${className}/${subjectCode}/chapter-${nextChapterNum}`)
                }}
              >
                Next Chapter
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          {/* Listen Tab Content */}
          <TabsContent value="listen" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="w-5 h-5 mr-2 text-purple-600" />
                  Audio Narration
                </CardTitle>
                <CardDescription>
                  Listen to AI-powered narration of this chapter
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-sm bg-gray-100 dark:bg-gray-800 rounded-full h-32 flex items-center justify-center">
                  {isAudioGenerating ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Generating audio...</span>
                    </div>
                  ) : (
                    <div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'} cursor-pointer hover:opacity-80`}
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? 
                        <PauseCircle className="w-10 h-10" /> :
                        <PlayCircle className="w-10 h-10" />
                      }
                    </div>
                  )}
                  <audio 
                    ref={audioRef} 
                    src="/public/video/hero-video.mp4" // Using an existing video as placeholder
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                </div>
                
                <div className="w-full max-w-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">0:00</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(chapterData.estimatedTime / 4)}:00</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                
                <div className="space-x-3">
                  {!isPlaying && !isAudioGenerating && (
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600"
                      onClick={generateAudio}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Generate & Play Audio
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => {
                    // In a real implementation, this would download the audio file
                    // For now, show an alert with details
                    alert(`Downloading audio for Class ${classNumber}, ${subjectCode.toUpperCase()}, Chapter ${chapterNum}: ${chapterData.title}...\n\nThis feature will be fully implemented soon!`);
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Audio
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Voice Style
                  </label>
                  <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
                    <option>Natural</option>
                    <option>Conversational</option>
                    <option>Professional</option>
                    <option>Enthusiastic</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Speed
                  </label>
                  <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
                    <option>0.8x (Slower)</option>
                    <option selected>1.0x (Normal)</option>
                    <option>1.2x (Faster)</option>
                    <option>1.5x (Very Fast)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Tab Content */}
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Chapter Quiz
                </CardTitle>
                <CardDescription>
                  Test your understanding of key concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showQuizResults ? (
                  <>
                    {MOCK_QUIZ_QUESTIONS.map((question, index) => (
                      <div key={question.id} className="space-y-3 border-b pb-4 last:border-b-0">
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white flex">
                          <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 w-6 h-6 flex items-center justify-center rounded-full mr-2 text-sm">
                            {index + 1}
                          </span>
                          {question.question}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {question.options.map((option) => (
                            <div 
                              key={option} 
                              className={`border rounded-md p-3 cursor-pointer transition-colors ${
                                quizAnswers[question.id] === option 
                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                  : 'hover:border-gray-400'
                              }`}
                              onClick={() => handleQuizAnswer(question.id, option)}
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                                  quizAnswers[question.id] === option 
                                    ? 'border-purple-500' 
                                    : 'border-gray-300'
                                }`}>
                                  {quizAnswers[question.id] === option && (
                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                  )}
                                </div>
                                {option}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-center pt-4">
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8"
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length < MOCK_QUIZ_QUESTIONS.length}
                      >
                        Submit Quiz
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Quiz Results */}
                    <div className="mb-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-32 h-32 rounded-full border-8 border-purple-100 dark:border-purple-900 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{getQuizScore().percentage}%</div>
                            <div className="text-sm text-gray-500">Score</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-1">
                          {getQuizScore().percentage >= 80 
                            ? 'Great job!' 
                            : getQuizScore().percentage >= 60 
                            ? 'Good effort!' 
                            : 'Keep practicing!'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          You got {getQuizScore().score} out of {getQuizScore().total} questions correct.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mb-6"
                          onClick={resetQuiz}
                        >
                          Retake Quiz
                        </Button>
                      </div>
                    </div>
                    
                    {/* Detailed Results */}
                    <div className="space-y-6">
                      {MOCK_QUIZ_QUESTIONS.map((question, index) => {
                        const isCorrect = quizAnswers[question.id] === question.correctAnswer;
                        
                        return (
                          <div 
                            key={question.id} 
                            className={`border p-4 rounded-lg ${
                              isCorrect 
                                ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/10' 
                                : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/10'
                            }`}
                          >
                            <div className="flex items-start space-x-2 mb-2">
                              <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                                isCorrect 
                                  ? 'bg-green-500' 
                                  : 'bg-red-500'
                              }`}>
                                {isCorrect 
                                  ? <Check className="w-3 h-3 text-white" /> 
                                  : <X className="w-3 h-3 text-white" />
                                }
                              </div>
                              <div>
                                <h4 className="font-medium">{question.question}</h4>
                                <div className="mt-2 text-sm">
                                  <p className={`${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                    {isCorrect 
                                      ? 'Correct answer!' 
                                      : `Your answer: ${quizAnswers[question.id] || 'None'} | Correct answer: ${question.correctAnswer}`
                                    }
                                  </p>
                                </div>
                                <div className="mt-2 text-sm bg-white dark:bg-gray-800 p-3 rounded-md">
                                  <p className="font-medium">Explanation:</p>
                                  <p className="text-gray-700 dark:text-gray-300 mt-1">{question.explanation}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flashcards Tab Content */}
          <TabsContent value="flashcards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SquareStack className="w-5 h-5 mr-2 text-purple-600" />
                  Study Flashcards
                </CardTitle>
                <CardDescription>
                  Test your recall of key concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-full max-w-lg aspect-[3/2] perspective-1000 mb-6">
                  <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${showFlashcardAnswer ? 'rotate-y-180' : ''}`}
                       onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}>
                    {/* Front of card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-xl shadow-lg p-6 flex items-center justify-center text-center backface-hidden">
                      <div>
                        <div className="text-sm text-purple-700 dark:text-purple-400 mb-4">Question {currentFlashcard + 1} of {MOCK_FLASHCARDS.length}</div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                          {MOCK_FLASHCARDS[currentFlashcard].question}
                        </h3>
                        <div className="mt-4 text-sm text-purple-600 dark:text-purple-300">
                          Click to reveal answer
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl shadow-lg p-6 flex items-center justify-center text-center backface-hidden rotate-y-180">
                      <div>
                        <div className="text-sm text-indigo-700 dark:text-indigo-400 mb-4">Answer</div>
                        <p className="text-lg text-gray-900 dark:text-white">
                          {MOCK_FLASHCARDS[currentFlashcard].answer}
                        </p>
                        <div className="mt-4 text-sm text-indigo-600 dark:text-indigo-300">
                          Click to see question
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <Button onClick={prevFlashcard} variant="outline">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {currentFlashcard + 1} / {MOCK_FLASHCARDS.length}
                  </div>
                  <Button onClick={nextFlashcard} variant="outline">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="mt-6 w-full">
                  <div className="text-center mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Study Progress</h4>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">0%</span>
                    <span className="text-sm text-gray-500">50%</span>
                    <span className="text-sm text-gray-500">100%</span>
                  </div>
                  <Progress value={((currentFlashcard + 1) / MOCK_FLASHCARDS.length) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
                onClick={() => {
                  // Generate new flashcards API call would go here
                  alert('Generating more flashcards...')
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate More Flashcards
              </Button>
            </div>
          </TabsContent>

          {/* Summary Tab Content */}
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  AI-Generated Summary
                </CardTitle>
                <CardDescription>
                  Key points from the chapter, simplified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-lg text-purple-800 dark:text-purple-300 mb-2">Main Concept</h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      Food is essential for all living organisms for growth, repair and energy. Plants make their own food through photosynthesis, while all other organisms depend directly or indirectly on plants for food.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Key Points Simplified</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <span className="text-green-700 dark:text-green-300 text-sm">1</span>
                          </div>
                          <h4 className="font-medium">Food Sources</h4>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          We get food from both plants (fruits, vegetables, cereals, pulses) and animals (milk, eggs, meat, honey).
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <span className="text-green-700 dark:text-green-300 text-sm">2</span>
                          </div>
                          <h4 className="font-medium">Food Variety</h4>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Food habits vary by region based on availability. For example, coastal areas have more seafood in their diet.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <span className="text-green-700 dark:text-green-300 text-sm">3</span>
                          </div>
                          <h4 className="font-medium">Animal Classification</h4>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Animals are classified as herbivores (plant-eaters), carnivores (animal-eaters), omnivores (both), and scavengers (eat dead animals).
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <span className="text-green-700 dark:text-green-300 text-sm">4</span>
                          </div>
                          <h4 className="font-medium">Food Chain</h4>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          A food chain shows how energy flows from plants to animals to other animals. Example: Grass → Deer → Lion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium text-lg mb-4">Visual Summary</h3>
                  <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                    <div className="text-center mb-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Food Sources and Classification Diagram
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-2">
                          <Globe className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="font-medium">Plants</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Make their own food</p>
                      </div>
                      
                      <div className="text-center flex flex-col items-center">
                        <ChevronRight className="rotate-90 md:rotate-0 w-6 h-6 text-gray-400" />
                        <p className="text-xs text-gray-500">Energy Flow</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mx-auto mb-2">
                          <Users className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h4 className="font-medium">Herbivores</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Eat only plants</p>
                      </div>
                      
                      <div className="text-center flex flex-col items-center">
                        <ChevronRight className="rotate-90 md:rotate-0 w-6 h-6 text-gray-400" />
                        <p className="text-xs text-gray-500">Energy Flow</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mb-2">
                          <Target className="w-12 h-12 text-red-600 dark:text-red-400" />
                        </div>
                        <h4 className="font-medium">Carnivores</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Eat only animals</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-indigo-600"
                    onClick={() => {
                      // Create a simple PDF URL with query parameters for a hypothetical PDF generation API
                      const summaryText = encodeURIComponent(`Class ${classNumber}, ${subjectCode.toUpperCase()}, Chapter ${chapterNum}: ${chapterData.title} Summary`);
                      const pdfUrl = `/api/generate-pdf?title=${summaryText}&type=summary&class=${classNumber}&subject=${subjectCode}&chapter=${chapterNum}`;
                      
                      // In a real implementation, this would call an API endpoint that returns a PDF
                      // For now, just show a more detailed alert
                      alert(`Downloading summary for Class ${classNumber}, ${subjectCode.toUpperCase()}, Chapter ${chapterNum}: ${chapterData.title}...\n\nThis feature will be fully implemented soon!`);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Summary
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Generate different summary style API call would go here
                      alert('Generating new summary style...')
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab Content */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                  Ask TutorBuddy AI
                </CardTitle>
                <CardDescription>
                  Get instant answers to your questions about this chapter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <LearningToolsProvider questionRef={`chapter-${chapterNum}`} initialText="">
                    <AITutorChat 
                      showTitle={false} 
                      contextText={`Class ${classNumber}, ${subjectCode.toUpperCase()}, Chapter ${chapterNum}: ${chapterData.title}\n\n${MOCK_CHAPTER_CONTENT}`} 
                    />
                  </LearningToolsProvider>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Explain the difference between herbivores and carnivores',
                    'What is photosynthesis and why is it important?',
                    'How do food chains work?',
                    'Why do different regions have different food habits?',
                    'What food products do we get from animals?',
                    'Give examples of plants we eat different parts of'
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto py-2"
                      onClick={() => {
                        // Would send question to AI chat
                        alert(`Asking: ${question}`)
                      }}
                    >
                      <CircleHelp className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Chapter Navigation Footer */}
        <div className="flex items-center justify-between border-t pt-6">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              const prevChapterNum = chapterNum - 1
              if (prevChapterNum > 0) {
                router.push(`/ncert/${className}/${subjectCode}/chapter-${prevChapterNum}`)
              }
            }}
            disabled={chapterNum <= 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Chapter
          </Button>
          
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Chapter {chapterNum} of {subjectCode === 'math' ? 14 : 16}
            </div>
            <Progress value={(chapterNum / (subjectCode === 'math' ? 14 : 16)) * 100} className="w-40 h-1 mt-1" />
          </div>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              const nextChapterNum = chapterNum + 1
              router.push(`/ncert/${className}/${subjectCode}/chapter-${nextChapterNum}`)
            }}
          >
            Next Chapter
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Fixed Action Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6">
        <div className="relative">
          <Button 
            size="icon" 
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
            onClick={() => {
              // Mobile menu toggle
            }}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Add this to your CSS (globals.css or equivalent)
// These are needed for the flashcard flip effect
// .perspective-1000 {
//   perspective: 1000px;
// }
// .transform-style-3d {
//   transform-style: preserve-3d;
// }
// .backface-hidden {
//   backface-visibility: hidden;
// }
// .rotate-y-180 {
//   transform: rotateY(180deg);
// }