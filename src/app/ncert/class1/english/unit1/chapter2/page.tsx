"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen, 
  ChevronRight,
  Play,
  ArrowLeft,
  Download,
  MessageSquare,
  Headphones,
  FileText,
  Target,
  PauseCircle,
  PlayCircle,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { LearningToolsProvider, AITutorChat } from '@/components/learning-tools'

// Chapter content based on PDF analysis
const CHAPTER_CONTENT = `
# Three Little Pigs

## Introduction
This is a classic story about three little pigs who build different houses to protect themselves from the big bad wolf.

## The Story
Once upon a time, there were three little pigs. They each decided to build a house.

The first little pig built his house of straw. He was lazy and wanted to finish quickly.

The second little pig built his house of sticks. He worked a little harder than the first pig.

The third little pig built his house of bricks. He worked very hard and took his time.

One day, a big bad wolf came along. He saw the first house made of straw.

"Little pig, little pig, let me in!" said the wolf.
"Not by the hair on my chinny chin chin!" said the pig.
"Then I'll huff and I'll puff and I'll blow your house down!" said the wolf.

And he did! The first little pig ran to the second pig's house.

The wolf followed and tried the same with the house of sticks. He huffed and puffed and blew that house down too!

Both pigs ran to the third pig's house of bricks.

The wolf came to the brick house. He huffed and puffed, but the house was too strong. He could not blow it down.

The three little pigs were safe in the brick house, and the wolf went away hungry.

## Vocabulary
- **Straw**: Dried stalks of grain
- **Sticks**: Small branches from trees
- **Bricks**: Blocks made from baked clay
- **Huff**: To blow out air forcefully
- **Puff**: To blow out air in short bursts
`;

// Quiz questions
const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'What did the first little pig build his house with?',
    options: ['Bricks', 'Straw', 'Sticks', 'Stones'],
    correctAnswer: 'Straw',
    explanation: 'The first little pig built his house of straw because he was lazy and wanted to finish quickly.'
  },
  {
    id: 'q2',
    question: 'What did the third little pig build his house with?',
    options: ['Straw', 'Sticks', 'Bricks', 'Wood'],
    correctAnswer: 'Bricks',
    explanation: 'The third little pig built his house of bricks. He worked very hard and took his time.'
  },
  {
    id: 'q3',
    question: 'What did the wolf say before blowing down the houses?',
    options: [
      '"Little pig, come out now!"', 
      '"I am hungry, let me in!"', 
      '"Then I\'ll huff and I\'ll puff and I\'ll blow your house down!"', 
      '"Open the door right now!"'
    ],
    correctAnswer: '"Then I\'ll huff and I\'ll puff and I\'ll blow your house down!"',
    explanation: 'The wolf said, "Then I\'ll huff and I\'ll puff and I\'ll blow your house down!" before trying to blow down each house.'
  }
];

export default function Chapter2Page() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  
  const [activeTab, setActiveTab] = useState('read')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioGenerating, setIsAudioGenerating] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  
  const audioRef = useRef<HTMLAudioElement>(null)

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  // Functions for the audio tab
  const generateAudio = () => {
    setIsAudioGenerating(true)
    // Simulate API call to text-to-speech service
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
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return {
      score: correct,
      total: QUIZ_QUESTIONS.length,
      percentage: Math.round((correct / QUIZ_QUESTIONS.length) * 100)
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
    const sections = markdown.split('\\n## ')
    
    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          if (index === 0) { // Title and introduction
            const [title, ...content] = section.split('\\n')
            return (
              <div key="intro" className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title.replace('# ', '')}</h1>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  {content.join('\\n').split('\\n\\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )
          } else {
            const [sectionTitle, ...sectionContent] = section.split('\\n')
            const sectionId = `section-${index}`
            const isExpanded = expandedSections[sectionId] !== false // Default to expanded
            
            return (
              <div key={sectionId} className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <button
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-700"
                  onClick={() => toggleSection(sectionId)}
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{sectionTitle}</h2>
                </button>
                
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    {sectionContent.join('\\n').split('\\n\\n').map((content, i) => {
                      // Handle bold text (e.g., **Fresh**)
                      if (content.includes('**')) {
                        const parts = content.split('**');
                        return (
                          <div key={`p-${i}`} className="text-gray-700 dark:text-gray-300">
                            {parts.map((part, j) => {
                              if (j % 2 === 0) {
                                // If it's followed by a colon, it's likely a term definition
                                if (part.includes(':')) {
                                  const [term, definition] = part.split(':');
                                  return (
                                    <span key={j}>
                                      {term}: <strong>{parts[j+1]}</strong>{definition}
                                    </span>
                                  );
                                }
                                return part;
                              } else {
                                return <strong key={j}>{part}</strong>;
                              }
                            })}
                          </div>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p key={`p-${i}`} className="text-gray-700 dark:text-gray-300">{content}</p>
                      );
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
    <div className="container mx-auto pb-12 px-4">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/ncert/class1" className="text-blue-600 hover:underline flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Class 1
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/ncert/class1/english" className="text-blue-600 hover:underline">
                English
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/ncert/class1/english/unit1" className="text-blue-600 hover:underline">
                Unit 1
              </Link>
              <span className="text-gray-500">/</span>
              <span>Chapter 2</span>
            </div>
            <h1 className="text-3xl font-bold">Three Little Pigs</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Unit 1, Chapter 2 - NCERT Class 1 English
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => window.open('/pdfs/class1/english/aemru1c2.pdf', '_blank')}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 shadow-sm border">
            <TabsTrigger 
              value="read" 
              className="flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <BookOpen className="w-4 h-4" />
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
                {renderMarkdown(CHAPTER_CONTENT)}
              </CardContent>
            </Card>
            
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  router.push('/ncert/class1/english/unit1/chapter1')
                }}
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
                  router.push('/ncert/class1/english/unit2/chapter1')
                }}
              >
                Next Unit
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">3:00</span>
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
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Audio
                  </Button>
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
                    {QUIZ_QUESTIONS.map((question, index) => (
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
                        disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
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
                  </>
                )}
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
                  <LearningToolsProvider questionRef="class1-english-unit1-chapter2" initialText="">
                    <AITutorChat 
                      showTitle={false} 
                      contextText={`Class 1, English, Unit 1, Chapter 2: Three Little Pigs\n\n${CHAPTER_CONTENT}`} 
                    />
                  </LearningToolsProvider>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="border-t mt-6 pt-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              router.push('/ncert/class1/english/unit1/chapter1')
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Chapter
          </Button>
          
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Chapter 2 of 2 in Unit 1
            </div>
            <Progress value={100} className="w-40 h-1 mt-1" />
          </div>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              router.push('/ncert/class1/english/unit2/chapter1')
            }}
          >
            Next Unit
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}